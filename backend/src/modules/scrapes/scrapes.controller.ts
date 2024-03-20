import { Router } from "express";
import { getHtmlContent } from "./scrapes.service";

export default (router: Router) => {
  router.get("/scrape", getHtmlContent);
};
