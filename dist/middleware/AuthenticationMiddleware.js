"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const typeorm_plus_1 = require("typeorm-plus");
let AuthenticationMiddleware = class AuthenticationMiddleware {
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside middleware");
            const authorization = req.headers.authorization;
            if (req.url.includes("/account")) {
                return next();
            }
            if (!authorization || authorization.length === 0) {
                res.status(401).send({ message: "Provide token" });
                return;
            }
            try {
                // Perform authorization logic without attempting to parse as JSON
                const data = yield this.checkAuthorization(authorization, req);
                console.log("data ===> ", data);
                if (!data) {
                    res.status(401).send({ status: 401, message: "Unauthorized" });
                    return;
                }
                // Example: Setting user data in request for use in subsequent middleware/controllers
                // req.user = data; // Set user data to request object
                console.log("error here");
                next(); // Continue to the next middleware/controller
                console.log("error after next");
            }
            catch (error) {
                console.log("Error in use method:", error);
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
    }
    checkAuthorization(token, req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const manager = (0, typeorm_plus_1.getManager)();
                const user = yield manager.query(`SELECT * FROM account a WHERE a.appSecretToken = '${token}' AND a.isDeleted = 0`);
                // Assuming user is an array and we check if it's not empty
                if (user && user.length > 0) {
                    req.headers.authorization = user;
                    console.log("user", user);
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
};
AuthenticationMiddleware = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "before" })
], AuthenticationMiddleware);
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=AuthenticationMiddleware.js.map