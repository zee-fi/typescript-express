import { Request, Response, NextFunction, ErrorRequestHandler, Application } from "express"; 
import { REPLCommand } from "repl";

module.exports = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};
