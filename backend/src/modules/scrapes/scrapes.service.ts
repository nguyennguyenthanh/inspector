import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import {
  IChartData,
  IGetHtmlContentQuery,
  IGetHtmlContentResponse,
} from "./scrapes.interface";
import { convertToNumeric } from "../../shared/utils";

export const getHtmlContent = async (
  req: Request,
  res: Response<IGetHtmlContentResponse>
) => {
  const { url } = req.query as IGetHtmlContentQuery;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data, {
    decodeEntities: false,
  });
  const table = $("table").first();
  // Create an empty array to store the number
  const headers: string[] = [];
  const data: IGetHtmlContentResponse = {};

  // Get table headers
  table.find("tr:first-child th").each((_, element) => {
    headers.push($(element).text().trim());
  });

  // Get table data (excluding headers row)
  table.find("tr:not(:first-child)").each((i, row) => {
    $(row)
      .find("td")
      .each((j, cell) => {
        const cellData: string = $(cell).text().trim();
        const numeric = convertToNumeric(cellData);

        if (numeric) {
          const chartData: IChartData = {
            label: `${headers[j]}`,
            value: numeric,
          };
          if (!data[headers[j]]) {
            data[headers[j]] = [chartData];
          } else {
            data[headers[j]].push(chartData);
          }
        }
      });
  });

  // Response
  res.status(200).json(data);
};
