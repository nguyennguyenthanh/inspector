import {
  IGetHtmlContentResponse,
  IHTMLQueryInput,
} from "../modules/Chart/interface";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Environment } from "../shared/environment";

export const getHtmlContent = (
  req: IHTMLQueryInput,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<IGetHtmlContentResponse>> =>
  axios.get<IGetHtmlContentResponse>(
    `${Environment.API_URL}/scrape?url=${req.url}`,
    {
      ...config,
    }
  );
