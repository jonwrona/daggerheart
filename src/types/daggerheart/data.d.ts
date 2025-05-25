import type { Ancestry, Class } from "./daggerheart";
import type { UUID } from "crypto";

export interface Data {
  [id: UUID]: DataPack | undefined;
}

export interface DataPack {
  id?: UUID;
  name: string;
  data: Partial<{
    ancestries: Ancestry[];
    classes: Class[];
  }>;
}
