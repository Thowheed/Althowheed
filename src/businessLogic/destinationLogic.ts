import { Service } from 'typedi';
import { EntityManager } from 'typeorm';
import { InjectManager } from 'typeorm-typedi-extensions';
import { Account } from '../entity/Account'; // Adjust import path as per your project structure
import { getManager } from 'typeorm-plus';
import { v4 as uuidv4 } from 'uuid';
import { Destination } from '../entity/Destination';

@Service()
export default class DestinationLogic {
    modelName(): string {
        return Destination.name;
    }

    public async destinationObject(input: any): Promise<Destination> {
        try {
            let checkdestinationId = await this.findDestinationById(input)
            let destinationObj = new Destination();

            destinationObj.url = input.url ? input.url : checkdestinationId.url;
            destinationObj.httpMethod = input.httpMethod ? input.httpMethod : checkdestinationId.httpMethod;
            destinationObj.headers = input.headers ? JSON.stringify(input.headers) : checkdestinationId.headers;
            destinationObj.accountId = input.accountId ? input.accountId : checkdestinationId.accountId; // Generate appSecretToken
            destinationObj.isDeleted = input.isDeleted ? 1 : 0;

            if (checkdestinationId) {
                destinationObj.isDeleted = input.isDeleted ? 1 : 0;
                destinationObj.id = checkdestinationId.id
            }

            return destinationObj;
        } catch (error) {
            console.error('Error in accountObject:', error);
            throw error;
        }
    }

    public async createOrUpdateDestinationLogic(input: any, CurrentUser: any) {
        try {
            let accountCreation = await this.destinationObject(input);

            const entityManager = getManager();
            let results = await entityManager.save(Destination, accountCreation);

            return results;
        } catch (error) {
            console.error('Error in createOrUpdateAccount:', error);
            throw error;
        }
    }

    public async findDestinationById(input) {
        try {
            let entityManager = getManager()
            let checkdestinationId: any = await entityManager.createQueryBuilder(this.modelName(), this.modelName())
                .where({ isDeleted: 0, id: input?.id })
                .getOne();

            return checkdestinationId;
        } catch (error) {
            console.log("Error_inside_findByDestinaiton:: ", error)
            throw error;
        }
    }

    public async findDestinationAccountId(input) {
        try {
            let entityManager = getManager()
            let checkdestinationId: any = await entityManager.createQueryBuilder(this.modelName(), this.modelName())
                .where({ isDeleted: 0, accountId: input?.id })
                .getMany();

            return checkdestinationId;
        } catch (error) {
            console.log("Error_inside_findByDestinaiton:: ", error)
            throw error;
        }
    }
}

