import { Router } from "express";
import scrapes from "./modules/scrapes/scrapes.controller";

const router = Router();

export default (): Router => {
  scrapes(router);
  return router;
};
