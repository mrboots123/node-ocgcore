# OCGCore

Node.js FFI bindings for OCGCore - the Yu-Gi-Oh! Official Card Game core engine.

## Installation

```bash
npm install ocgcore
```

## Prerequisites

You need the OCGCore shared library (`libocgcore.so` on Linux, `libocgcore.dylib` on macOS) compiled for your platform. The library should also have `liblua.so` available in the same directory or system library path.

## Usage

### Basic Usage

```typescript
import { ocgCore } from 'ocgcore';

// Initialize OCGCore with the library path
const core = ocgCore('/path/to/libocgcore.so');

// Create a duel with a random seed
const duel = core.create_duel(12345);

// Set player info (duel, playerid, lp, startcount, drawcount)
core.set_player_info(duel, 0, 8000, 5, 1);
core.set_player_info(duel, 1, 8000, 5, 1);

// Start the duel
core.start_duel(duel, 0);
```

### Using Advanced Seed Array

```typescript
import { ocgCore, createSeedArray } from 'ocgcore';

const core = ocgCore('/path/to/libocgcore.so');

// Create duel with multiple seed values for better randomness
const seedArray = createSeedArray([12345, 67890, 11111]);
const duel = core.create_duel_v2(seedArray);
```

### Using CardData Structure

```typescript
import { CardData } from 'ocgcore';

const card = new CardData({
  code: 12345,
  alias: 0,
  setcode: [/* array of setcodes */],
  type: 1,
  level: 4,
  attribute: 1,
  race: 1,
  attack: 1800,
  defense: 1000,
  lscale: 0,
  rscale: 0,
  link_marker: 0
});
```

### Event-Driven Usage

```typescript
import { OCGCoreEmitter } from 'ocgcore';

// Create an event-enabled OCGCore instance
const emitter = new OCGCoreEmitter('/path/to/libocgcore.so');

// Listen to all method calls
emitter.onBeforeCall((event) => {
  console.log(`Calling ${event.method} with args:`, event.args);
});

emitter.onAfterCall((event) => {
  console.log(`${event.method} returned:`, event.result);
});

// Listen to specific methods
emitter.onBeforeMethod('create_duel', (event) => {
  console.log('Creating duel with seed:', event.args[0]);
});

// Get the proxied core instance
const core = emitter.getCore();

// All method calls will now emit events
const duel = core.create_duel(12345);
```

## API

### `ocgCore(libraryPath: string): OCGCore`

Initialize the OCGCore library.

- **libraryPath**: Path to the libocgcore shared library
- **Returns**: OCGCore instance with all available functions
- **Throws**: Error if library path doesn't exist or is not accessible

### OCGCore Methods

- `create_duel(seed: number)`: Create a duel with a single seed value
- `create_duel_v2(seed_sequence: Pointer)`: Create a duel with multiple seed values
- `start_duel(duel: Pointer, options: number)`: Start the duel
- `end_duel(duel: Pointer)`: End the duel
- `set_player_info(duel: Pointer, playerid: number, lp: number, startcount: number, drawcount: number)`: Set player information
- `new_card(duel: Pointer, code: number, owner: number, playerid: number, location: number, sequence: number, position: number)`: Add a card to the duel
- `process(duel: Pointer)`: Process the duel state
- `get_message(duel: Pointer, buffer: Pointer)`: Get messages from the duel
- And more...

### Helper Functions

- `createSeedArray(seeds: number[])`: Create a seed array for `create_duel_v2`

### Event Emitter

`OCGCoreEmitter` provides event-driven access to OCGCore:

- `onBeforeCall(listener)`: Listen to all method calls before execution
- `onAfterCall(listener)`: Listen to all method calls after execution
- `onBeforeMethod(method, listener)`: Listen to specific method before execution
- `onAfterMethod(method, listener)`: Listen to specific method after execution
- `onError(listener)`: Listen to errors

## TypeScript Support

This package includes full TypeScript definitions with autocomplete support.

## License

ISC

## Contributing

Contributions are welcome! Please submit issues and pull requests on GitHub.
