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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const Account_1 = require("../entity/Account"); // Adjust import path as per your project structure
const typeorm_plus_1 = require("typeorm-plus");
const uuid_1 = require("uuid");
const destinationLogic_1 = __importDefault(require("./destinationLogic"));
let deestinationLogic = new destinationLogic_1.default();
let AccountLogic = class AccountLogic {
    modelName() {
        return Account_1.Account.name;
    }
    accountObject(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("input_in_accountObjec==>", input);
                let entityManager = (0, typeorm_plus_1.getManager)();
                let checkAccountId = yield entityManager.createQueryBuilder(this.modelName(), this.modelName())
                    .where({ isDeleted: 0, accountId: input === null || input === void 0 ? void 0 : input.accountId })
                    .getOne();
                console.log("checkAccount", input, checkAccountId);
                let accountObj = new Account_1.Account();
                accountObj.emailId = input.emailId ? input.emailId : checkAccountId.emailId;
                accountObj.accountId = input.accountId ? input.accountId : checkAccountId.emailId;
                accountObj.accountName = input.accountName ? input.accountName : checkAccountId.accountName;
                accountObj.website = input.website ? input.website : checkAccountId.website;
                // Example: Handle isDeleted flag (assuming it's a boolean in input)
                if (checkAccountId) {
                    let accountId = checkAccountId.id;
                    if (input.isDeleted == 1) {
                        console.log("inside isDeleted");
                        let updateQuery = `
                        UPDATE destination 
                        SET isDeleted = 0
                        WHERE isDeleted = 1 AND accountId = ${checkAccountId.id}

                    `;
                        let updatedQuery = yield entityManager.query(updateQuery);
                        console.log("updated qeuery", updatedQuery);
                    }
                    accountObj.id = checkAccountId.id;
                    accountObj.appSecretToken = checkAccountId.appSecretToken;
                    accountObj.isDeleted = input.isDeleted == 1 ? 1 : 0;
                }
                else {
                    accountObj.appSecretToken = (0, uuid_1.v4)(); // Generate appSecretToken here
                }
                return accountObj;
            }
            catch (error) {
                console.error('Error in accountObject:', error);
                throw error;
            }
        });
    }
    createOrUpdateAccountLogic(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create account object from input data
                const entityManager = (0, typeorm_plus_1.getManager)();
                let accountCreation = yield this.accountObject(input);
                let result = yield entityManager.save(accountCreation);
                console.log('Saved account:', result);
                return result;
            }
            catch (error) {
                console.error('Error in createOrUpdateAccount:', error);
                throw error;
            }
        });
    }
};
AccountLogic = __decorate([
    (0, typedi_1.Service)()
], AccountLogic);
exports.default = AccountLogic;
//# sourceMappingURL=accountLogic.js.map