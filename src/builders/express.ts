import compression from "compression";
import cors from "cors";
import express, {
    ErrorRequestHandler,
    Handler,
    Router,
    Express,
} from "express";

class ExpressAppBuilder {
    public static builder(): ExpressAppBuilder {
        return new ExpressAppBuilder();
    }

    private middlewares: Handler[];
    private routers: [string, Router][];
    private errorHandlers: ErrorRequestHandler[];

    private constructor() {
        this.middlewares = [];
        this.routers = [];
        this.errorHandlers = [];
    }

    withMiddleware(middleware: Handler) {
        this.middlewares.push(middleware);
    }

    withRouter(path: string, router: Router) {
        this.routers.push([path, router]);
    }

    withErrorHandler(errorHandler: ErrorRequestHandler) {
        this.errorHandlers.push(errorHandler);
    }

    build(): Express {
        const app = express();

        app.use(
            cors({
                origin: "*",
            }),
        );
        app.use(compression());

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        for (const middleware of this.middlewares) {
            app.use(middleware);
        }

        for (const [path, router] of this.routers) {
            app.use(path, router);
        }

        for (const errorHandler of this.errorHandlers) {
            app.use(errorHandler);
        }

        return app;
    }
}

export default ExpressAppBuilder;
