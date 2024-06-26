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
const typedi_1 = require("typedi");
const typeorm_plus_1 = require("typeorm-plus");
const Destination_1 = require("../entity/Destination");
let DestinationLogic = class DestinationLogic {
    modelName() {
        return Destination_1.Destination.name;
    }
    destinationObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let checkdestinationId = yield this.findDestinationById(input);
                let destinationObj = new Destination_1.Destination();
                destinationObj.url = input.url ? input.url : checkdestinationId.url;
                destinationObj.httpMethod = input.httpMethod ? input.httpMethod : checkdestinationId.httpMethod;
                destinationObj.headers = input.headers ? JSON.stringify(input.headers) : checkdestinationId.headers;
                destinationObj.accountId = input.accountId ? input.accountId : checkdestinationId.accountId; // Generate appSecretToken
                destinationObj.isDeleted = input.isDeleted ? 1 : 0;
                if (checkdestinationId) {
                    destinationObj.isDeleted = input.isDeleted ? 1 : 0;
                    destinationObj.id = checkdestinationId.id;
                }
                return destinationObj;
            }
            catch (error) {
                console.error('Error in accountObject:', error);
                throw error;
            }
        });
    }
    createOrUpdateDestinationLogic(input, CurrentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let accountCreation = yield this.destinationObject(input);
                const entityManager = (0, typeorm_plus_1.getManager)();
                let results = yield entityManager.save(Destination_1.Destination, accountCreation);
                return results;
            }
            catch (error) {
                console.error('Error in createOrUpdateAccount:', error);
                throw error;
            }
        });
    }
    findDestinationById(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let entityManager = (0, typeorm_plus_1.getManager)();
                let checkdestinationId = yield entityManager.createQueryBuilder(this.modelName(), this.modelName())
                    .where({ isDeleted: 0, id: input === null || input === void 0 ? void 0 : input.id })
                    .getOne();
                return checkdestinationId;
            }
            catch (error) {
                console.log("Error_inside_findByDestinaiton:: ", error);
                throw error;
            }
        });
    }
    findDestinationAccountId(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let entityManager = (0, typeorm_plus_1.getManager)();
                let checkdestinationId = yield entityManager.createQueryBuilder(this.modelName(), this.modelName())
                    .where({ isDeleted: 0, accountId: input === null || input === void 0 ? void 0 : input.id })
                    .getMany();
                return checkdestinationId;
            }
            catch (error) {
                console.log("Error_inside_findByDestinaiton:: ", error);
                throw error;
            }
        });
    }
};
DestinationLogic = __decorate([
    (0, typedi_1.Service)()
], DestinationLogic);
exports.default = DestinationLogic;
//# sourceMappingURL=destinationLogic.js.map