import { useQuery } from "react-query";
import { IHTMLQueryInput } from "./interface";
import { HTML_CONTENT } from "./constant";
import { getHtmlContent } from "../../services/scrape.service";
import { AxiosRequestConfig } from "axios";

export const useGetHTMLContent = (
  filter: IHTMLQueryInput,
  config?: AxiosRequestConfig
) =>
  useQuery([HTML_CONTENT, filter], () => getHtmlContent(filter, config), {
    keepPreviousData: true,
    enabled: false,
  });
