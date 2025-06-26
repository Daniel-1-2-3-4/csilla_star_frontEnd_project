export type storedOldDataType = Array<{
  date: string;
  subject: string;
}>;

export type oldDataType = Array<{ [subject: string]: string }>;

export type apiDataBarChart = {
  [subject: string]: number;
};

export type apiDataStackedBarChart = {
  [date: string]: {
    [subject: string]: number;
  };
};

export interface ChartState {
  loading: boolean;
  error: string | null;
  data: apiDataBarChart | null;
}

export interface StackedChartState {
  loading: boolean;
  error: string | null;
  data: apiDataStackedBarChart | null;
}
