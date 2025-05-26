import type { Ancestry, Class } from "./daggerheart";
import type { UUID } from "crypto";

export interface Data {
  [uuid: UUID]: DataPack | undefined;
}

export interface DBDataPack {
  uuid: UUID;
  name: string;
}

export interface DataPack extends DBDataPack {
  data: Partial<{
    ancestries: Ancestry[];
    classes: Class[];
  }>;
}
