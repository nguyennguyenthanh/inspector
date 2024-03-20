export interface IGetHtmlContentQuery {
  [key: string]: string;
  url: string;
}

export interface IChartData {
  label: string;
  value: number;
}

export interface IGetHtmlContentResponse {
  [key: string]: IChartData[];
}
