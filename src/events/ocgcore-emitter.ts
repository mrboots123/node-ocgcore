import { EventEmitter } from 'events';
import { ocgCore } from '../index.js';
import type { OCGCore } from '../types/ocgcore.js';

export interface OCGCoreEvent {
  method: string;
  args: any[];
  timestamp: number;
}

export interface OCGCoreEventWithResult extends OCGCoreEvent {
  result: any;
}

/**
 * Event-enabled wrapper for OCGCore that emits events on every method call
 */
export class OCGCoreEmitter extends EventEmitter {
  private core: OCGCore;

  constructor(libraryPath: string, luaLibPath?: string) {
    super();
    this.core = ocgCore(libraryPath, luaLibPath);
  }

  /**
   * Get the underlying OCGCore instance with event hooks
   */
  getCore(): OCGCore {
    const emitter = this;

    return new Proxy(this.core, {
      get(target, prop: string) {
        const original = target[prop as keyof OCGCore];

        if (typeof original === 'function') {
          return function(...args: any[]) {
            const event: OCGCoreEvent = {
              method: prop,
              args,
              timestamp: Date.now()
            };

            // Emit before call
            emitter.emit('before:call', event);
            emitter.emit(`before:${prop}`, event);

            try {
              // Call the original function
              const result = (original as any).apply(target, args);

              const eventWithResult: OCGCoreEventWithResult = {
                ...event,
                result
              };

              // Emit after successful call
              emitter.emit('after:call', eventWithResult);
              emitter.emit(`after:${prop}`, eventWithResult);

              return result;
            } catch (error) {
              // Emit error event
              emitter.emit('error', {
                ...event,
                error
              });
              emitter.emit(`error:${prop}`, {
                ...event,
                error
              });
              throw error;
            }
          };
        }

        return original;
      }
    }) as OCGCore;
  }

  /**
   * Listen to all method calls
   */
  onBeforeCall(listener: (event: OCGCoreEvent) => void): this {
    return this.on('before:call', listener);
  }

  /**
   * Listen to all method call results
   */
  onAfterCall(listener: (event: OCGCoreEventWithResult) => void): this {
    return this.on('after:call', listener);
  }

  /**
   * Listen to specific method before it's called
   */
  onBeforeMethod(method: keyof OCGCore, listener: (event: OCGCoreEvent) => void): this {
    return this.on(`before:${method as string}`, listener);
  }

  /**
   * Listen to specific method after it's called
   */
  onAfterMethod(method: keyof OCGCore, listener: (event: OCGCoreEventWithResult) => void): this {
    return this.on(`after:${method as string}`, listener);
  }

  /**
   * Listen to errors
   */
  onError(listener: (event: OCGCoreEvent & { error: any }) => void): this {
    return this.on('error', listener);
  }
}
