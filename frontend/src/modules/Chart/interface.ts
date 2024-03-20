export interface IHTMLQueryInput {
  url: string;
}

export interface IChartData {
  label: string;
  value: number;
}

export interface IGetHtmlContentResponse {
  [key: string]: IChartData[];
}
