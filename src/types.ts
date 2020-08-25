export type CasesType = [number, number];

export interface OverviewType {
  current: CasesType;
  recovered: CasesType;
  deceased: CasesType;
  confirmed: CasesType;
}

interface CityGuType {
  [cityId: string]: {
    cases: CasesType;
    gu: { [guId: number]: CasesType };
  };
}

export interface CurrentType extends CityGuType {}
export interface OverallType extends CityGuType {}
export interface StatsType {
  overview: OverviewType;
  current: CurrentType;
  overall: OverallType;
}
export interface UpdateType {
  src: string;
  gu: string;
  city: string;
  cases: number;
  datetime: string;
}

export interface NotificationType {
  counts: { [cityId: string]: number };
  total: number;
  current: number;
  delta: number;
}
