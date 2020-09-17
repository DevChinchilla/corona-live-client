export type CasesType = [number, number];

export interface OverviewType {
  current: CasesType;
  recovered: CasesType;
  deceased: CasesType;
  confirmed: CasesType;
}

export interface TimerseriesType {
  today: { [time: number]: CasesType };
  yesterday: { [time: number]: CasesType };
}

export interface AnnouncementType {
  date?: number;
  content: string;
  title: string;
}

export interface CasesSummaryType {
  checking: number;
  totalCases: number;
  yesterdayCases: number;
  todayCases: number;
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
  timeseries: TimerseriesType;
  announcements: AnnouncementType[];
  casesSummary: CasesSummaryType;
}
export interface UpdateType {
  src: string;
  gu: string;
  city: string;
  cases: number;
  datetime: string;
}

export interface NotificationType {
  casesCountByCity: { [cityId: string]: number };
  addedCases: number;
}
