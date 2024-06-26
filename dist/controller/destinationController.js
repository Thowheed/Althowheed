"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationController = void 0;
const routing_controllers_1 = require("routing-controllers");
const express_1 = require("express");
const destinationLogic_1 = __importDefault(require("../businessLogic/destinationLogic"));
let destination = new destinationLogic_1.default();
let DestinationController = class DestinationController {
    //api to create destination
    createOrUpdateDestinatio(requestBody, res, CurrentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Inside_controller", requestBody, CurrentUser);
                let result = yield destination.createOrUpdateDestinationLogic(requestBody, CurrentUser);
                console.log("result===>", result);
                return res.status(200).send(result);
            }
            catch (error) {
                console.log("Error_in_createOrUpdateClient::: ", error);
                // Handle specific HTTP errors
                if (error.httpCode === 400) {
                    return res.status(400).send({ message: "Bad request" });
                }
                else if (error.httpCode === 401) {
                    return res.status(401).send({ message: "Unauthorized" });
                }
                // Default error handling
                return res.status(500).send({ message: "Internal Server Error" });
            }
        });
    }
    //api to get all specific account destination
    getDestination(requestBody, res, CurrentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Inside_controller", requestBody, CurrentUser);
                let result = yield destination.findDestinationById(requestBody);
                return res.status(200).send(result);
            }
            catch (error) {
                console.log("Error_in_createOrUpdateClient::: ", error);
                // Handle specific HTTP errors
                if (error.httpCode === 400) {
                    return res.status(400).send({ message: "Bad request" });
                }
                else if (error.httpCode === 401) {
                    return res.status(401).send({ message: "Unauthorized" });
                }
                // Default error handling
                return res.status(500).send({ message: "Internal Server Error" });
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/destination'),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __param(2, (0, routing_controllers_1.HeaderParam)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, String]),
    __metadata("design:returntype", Promise)
], DestinationController.prototype, "createOrUpdateDestinatio", null);
__decorate([
    (0, routing_controllers_1.Get)('/getDestination'),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __param(2, (0, routing_controllers_1.HeaderParam)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, String]),
    __metadata("design:returntype", Promise)
], DestinationController.prototype, "getDestination", null);
DestinationController = __decorate([
    (0, routing_controllers_1.JsonController)("/server/api")
], DestinationController);
exports.DestinationController = DestinationController;
//# sourceMappingURL=destinationController.js.map