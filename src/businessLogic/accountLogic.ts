import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Account } from '../entity/Account'; // Adjust import path as per your project structure
import { getManager } from 'typeorm-plus';
import { v4 as uuidv4 } from 'uuid';
import DestinationLogic from './destinationLogic';

let deestinationLogic = new DestinationLogic()
@Service()
export default class AccountLogic {
    modelName(): string {
        return Account.name;
    }

    public async accountObject(input: any) {
        try {
            console.log("input_in_accountObjec==>", input)
            let entityManager = getManager()
            let checkAccountId: any = await entityManager.createQueryBuilder(this.modelName(), this.modelName())
                .where({ isDeleted: 0, accountId: input?.accountId })
                .getOne();

            console.log("checkAccount", input, checkAccountId)
            let accountObj = new Account();
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

                    `
                    let updatedQuery = await entityManager.query(updateQuery)
                    console.log("updated qeuery", updatedQuery);

                }
                accountObj.id = checkAccountId.id
                accountObj.appSecretToken = checkAccountId.appSecretToken;
                accountObj.isDeleted = input.isDeleted == 1 ? 1 : 0;

            }
            else {
                accountObj.appSecretToken = uuidv4(); // Generate appSecretToken here
            }

            return accountObj;
        } catch (error) {
            console.error('Error in accountObject:', error);
            throw error;
        }
    }

    public async createOrUpdateAccountLogic(input: any) {
        try {
            // Create account object from input data
            const entityManager = getManager();
            let accountCreation = await this.accountObject(input);

            let result = await entityManager.save(accountCreation);

            console.log('Saved account:', result);
            return result;
        } catch (error) {
            console.error('Error in createOrUpdateAccount:', error);
            throw error;
        }
    }
}
