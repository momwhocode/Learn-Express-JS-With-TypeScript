import { Express, Request, Response, NextFunction } from "express";

function routes(app: Express) {
  app.get("/api/ex20/books/:bookId/:authID", handleGetBooks)
}

export default routes;