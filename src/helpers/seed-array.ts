/**
 * Create a seed array for create_duel_v2 using koffi
 * @param seeds - Array of uint32 values to use as seed sequence
 * @returns Buffer containing uint32 array that can be passed to create_duel_v2
 *
 * @example
 * ```typescript
 * import { ocgCoreKoffi, createSeedArray } from 'ocgcore';
 *
 * const core = ocgCoreKoffi('/path/to/libocgcore.so');
 * const seedArray = createSeedArray([12345, 67890, 11111]);
 * const duel = core.create_duel_v2(seedArray);
 * ```
 */
export function createSeedArray(seeds: number[]): Buffer {
  // Each uint32 is 4 bytes
  const buffer = Buffer.alloc(seeds.length * 4);

  // Write each seed as a uint32 (little-endian by default on most systems)
  for (let i = 0; i < seeds.length; i++) {
    buffer.writeUInt32LE(seeds[i]!, i * 4);
  }

  return buffer;
}

/**
 * Read seed values back from a buffer (useful for debugging)
 * @param buffer - Buffer containing uint32 array
 * @param count - Number of uint32 values to read
 * @returns Array of seed values
 */
export function readSeedArray(buffer: Buffer, count: number): number[] {
  const seeds: number[] = [];

  for (let i = 0; i < count; i++) {
    seeds.push(buffer.readUInt32LE(i * 4));
  }

  return seeds;
}
