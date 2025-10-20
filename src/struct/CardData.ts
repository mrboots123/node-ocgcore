import koffi from 'koffi';

/**
 * CardData struct definition using koffi
 * This matches the C struct layout from OCGCore
 */
export const CardDataStruct = koffi.struct('CardData', {
  code: 'uint',
  alias: 'uint',
  setcode: koffi.array('uint16', 16),  // Array of 16 uint16 values
  type: 'uint',
  level: 'uint',
  attribute: 'uint',
  race: 'uint',
  attack: 'int',
  defense: 'int',
  lscale: 'uint',
  rscale: 'uint',
  link_marker: 'uint'
});

/**
 * TypeScript interface matching the CardData struct
 */
export interface CardData {
  code: number;
  alias: number;
  setcode: number[];
  type: number;
  level: number;
  attribute: number;
  race: number;
  attack: number;
  defense: number;
  lscale: number;
  rscale: number;
  link_marker: number;
}

/**
 * Helper to create a CardData object
 */
export function createCardData(data: Partial<CardData> = {}): CardData {
  return {
    code: data.code ?? 0,
    alias: data.alias ?? 0,
    setcode: data.setcode ?? new Array(16).fill(0),
    type: data.type ?? 0,
    level: data.level ?? 0,
    attribute: data.attribute ?? 0,
    race: data.race ?? 0,
    attack: data.attack ?? 0,
    defense: data.defense ?? 0,
    lscale: data.lscale ?? 0,
    rscale: data.rscale ?? 0,
    link_marker: data.link_marker ?? 0
  };
}

export default CardDataStruct;
