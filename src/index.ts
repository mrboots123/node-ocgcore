import koffi from 'koffi';
import fs from 'fs';

/**
 * Initialize the OCGCore library with koffi (alternative to ffi-napi)
 * @param libraryPath - Path to the libocgcore.so or libocgcore.dylib file
 * @returns OCGCore instance with all available functions
 * @throws {Error} If the library path doesn't exist or is not accessible
 */
export function ocgCore(libraryPath: string) {
  if (!libraryPath) {
    throw new Error('Library path is required');
  }

  if (!fs.existsSync(libraryPath)) {
    throw new Error(`Library not found at path: ${libraryPath}`);
  }

  const stats = fs.statSync(libraryPath);
  if (!stats.isFile()) {
    throw new Error(`Path is not a file: ${libraryPath}`);
  }

  try {
    fs.accessSync(libraryPath, fs.constants.R_OK);
  } catch (error) {
    throw new Error(`Library file is not readable: ${libraryPath}`);
  }

  // Load the library
  const lib = koffi.load(libraryPath);

  // Define all the functions
  // Note: In koffi, 'void*' is used for pointers, 'uint8*' for byte buffers
  const set_script_reader = lib.func('set_script_reader', 'uint8*', ['void*']);
  const set_card_reader = lib.func('set_card_reader', 'void', ['void*']);
  const set_message_handler = lib.func('set_message_handler', 'void', ['void*']);

  const create_duel = lib.func('create_duel', 'void*', ['uint32']);
  const create_duel_v2 = lib.func('create_duel_v2', 'void*', ['void*']);

  const start_duel = lib.func('start_duel', 'void', ['void*', 'uint32']);
  const end_duel = lib.func('end_duel', 'void', ['void*']);

  const set_player_info = lib.func('set_player_info', 'void', [
    'void*',  // duel
    'int32',  // playerid
    'int32',  // lp
    'int32',  // startcount
    'int32'   // drawcount
  ]);

  const get_log_message = lib.func('get_log_message', 'void', ['void*', 'uint8*']);
  const get_message = lib.func('get_message', 'int32', ['void*', 'uint8*']);

  const process = lib.func('process', 'int32', ['void*']);

  const new_card = lib.func('new_card', 'void', [
    'void*',  // duel
    'uint32', // code
    'uint8',  // owner
    'uint8',  // playerid
    'uint8',  // location
    'uint8',  // sequence
    'uint8'   // position
  ]);

  const new_tag_card = lib.func('new_tag_card', 'void', [
    'void*',  // duel
    'uint32', // code
    'uint8',  // owner
    'uint8'   // location
  ]);

  const query_card = lib.func('query_card', 'int32', [
    'void*',  // duel
    'uint8',  // playerid
    'uint8',  // location
    'uint8',  // sequence
    'int32',  // query_flag
    'uint8*', // buffer
    'int32'   // use_cache
  ]);

  const query_field_count = lib.func('query_field_count', 'int32', [
    'void*',  // duel
    'uint8',  // playerid
    'uint8'   // location
  ]);

  const query_field_card = lib.func('query_field_card', 'int32', [
    'void*',  // duel
    'uint8',  // playerid
    'uint8',  // location
    'int32',  // query_flag
    'uint8*', // buffer
    'int32'   // use_cache
  ]);

  const query_field_info = lib.func('query_field_info', 'int32', [
    'void*',  // duel
    'uint8*'  // buffer
  ]);

  const set_responsei = lib.func('set_responsei', 'void', ['void*', 'int32']);
  const set_responseb = lib.func('set_responseb', 'void', ['void*', 'uint8*']);

  const preload_script = lib.func('preload_script', 'int32', [
    'void*',  // duel
    'string', // script path
    'int32'   // length
  ]);

  // Return object with all functions
  return {
    set_script_reader,
    set_card_reader,
    set_message_handler,
    create_duel,
    create_duel_v2,
    start_duel,
    end_duel,
    set_player_info,
    get_log_message,
    get_message,
    process,
    new_card,
    new_tag_card,
    query_card,
    query_field_count,
    query_field_card,
    query_field_info,
    set_responsei,
    set_responseb,
    preload_script
  };
}

export type { OCGCore } from './types/ocgcore.js';
export { OCGCoreEmitter } from './events/ocgcore-emitter.js';
export type { OCGCoreEvent, OCGCoreEventWithResult } from './events/ocgcore-emitter.js';
export { default as CardData } from './struct/CardData.js';
export { createSeedArray } from './helpers/seed-array.js';


