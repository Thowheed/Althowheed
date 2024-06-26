"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routing_controllers_1 = require("routing-controllers");
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const AuthenticationMiddleware_1 = require("./middleware/AuthenticationMiddleware");
const typeorm_plus_1 = require("typeorm-plus");
const handleCors = (router) => router.use((0, cors_1.default)({ origin: true }));
start()
    .then(() => {
    console.log("Application started...");
})
    .catch((err) => {
    console.log("Failed to start application", err);
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, data_source_1.connect)();
            const app = (0, express_1.default)();
            // useContainer(Container);
            function checkAuthorization(token) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const manager = (0, typeorm_plus_1.getManager)();
                        const user = yield manager.query(`SELECT * FROM account a WHERE a.appSecretToken = '${token}' AND a.isDeleted = 0`);
                        // Assuming user is an array and we check if it's not empty
                        if (user && user.length > 0) {
                            return user[0]; // Returning the first user found (adjust as per your query logic)
                        }
                        else {
                            return null; // No user found
                        }
                    }
                    catch (error) {
                        console.log("Error in checkAuthorization:", error);
                        throw error;
                    }
                });
            }
            app.use(body_parser_1.default.urlencoded({ extended: false }));
            app.use(body_parser_1.default.json());
            const routingControllersOptions = {
                controllers: [__dirname + "/controller/*"],
                defaultErrorHandler: false,
                middlewares: [AuthenticationMiddleware_1.AuthenticationMiddleware]
            };
            handleCors(app);
            const server = yield http_1.default.createServer(app);
            (0, routing_controllers_1.useExpressServer)(app, routingControllersOptions);
            server.timeout = 300000;
            const port = 3000;
            server.listen(port, () => {
                console.log(`Server is running on http://localhost:${process.env.port}`);
            });
        }
        catch (error) {
            throw error;
        }
    });
}
//# sourceMappingURL=server.js.map