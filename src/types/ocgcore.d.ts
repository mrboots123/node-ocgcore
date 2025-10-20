import { Pointer } from 'ref-napi';

export interface OCGCore {
  set_script_reader: (callback: Pointer<unknown>) => Pointer<unknown>;
  set_card_reader: (callback: Pointer<unknown>) => void;
  set_message_handler: (callback: Pointer<unknown>) => void;
  create_duel: (seed: number) => Pointer<unknown>;
  create_duel_v2: (seed_sequence: Pointer<unknown>) => Pointer<unknown>;
  start_duel: (duel: Pointer<unknown>, options: number) => void;
  end_duel: (duel: Pointer<unknown>) => void;
  set_player_info: (
    duel: Pointer<unknown>,
    playerid: number,
    lp: number,
    startcount: number,
    drawcount: number
  ) => void;
  get_log_message: (duel: Pointer<unknown>, buffer: Pointer<unknown>) => void;
  get_message: (duel: Pointer<unknown>, buffer: Pointer<unknown>) => number;
  process: (duel: Pointer<unknown>) => number;
  new_card: (
    duel: Pointer<unknown>,
    code: number,
    owner: number,
    playerid: number,
    location: number,
    sequence: number,
    position: number
  ) => void;
  new_tag_card: (
    duel: Pointer<unknown>,
    code: number,
    owner: number,
    location: number
  ) => void;
  query_card: (
    duel: Pointer<unknown>,
    playerid: number,
    location: number,
    sequence: number,
    query_flag: number,
    buffer: Pointer<unknown>,
    use_cache: number
  ) => number;
  query_field_count: (
    duel: Pointer<unknown>,
    playerid: number,
    location: number
  ) => number;
  query_field_card: (
    duel: Pointer<unknown>,
    playerid: number,
    location: number,
    query_flag: number,
    buffer: Pointer<unknown>,
    use_cache: number
  ) => number;
  query_field_info: (duel: Pointer<unknown>, buffer: Pointer<unknown>) => number;
  set_responsei: (duel: Pointer<unknown>, response: number) => void;
  set_responseb: (duel: Pointer<unknown>, buffer: Pointer<unknown>) => void;
  preload_script: (duel: Pointer<unknown>, script: string, length: number) => number;
}

declare const ocgcore: OCGCore;
export default ocgcore;
