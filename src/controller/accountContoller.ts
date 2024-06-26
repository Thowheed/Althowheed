import { JsonController, Post, Body, HeaderParam, Res, Get } from "routing-controllers";
import { Response } from 'express';
import AccountLogic from "../businessLogic/accountLogic";

let accountLogic = new AccountLogic();

@JsonController("/server/api")
export class AccountController {

    //api creates updates both account and destination if account deleted destinations will also be deleted
    @Post('/account')
    async createOrUpdateAccount(
        @Body() requestBody: JSON,
        @Res() res: Response,
        // @HeaderParam("authorization") authorization: String
    ) {
        try {
                let result = await accountLogic.createOrUpdateAccountLogic(requestBody);
                return res.status(200).send(result);

        } catch (error) {
            console.log("Error_in_createOrUpdateAccount::: ", error);
            if (error.httpCode === 400) {
                return res.status(400).send({ message: "Bad request" });
            } else if (error.httpCode === 401) {
                return res.status(401).send({ message: "Unauthorized" });
            }
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }


    //api to get all specific account
    @Get('/getAccount')
    async getAccount(
        @Body() requestBody: JSON,
        @Res() res: Response,
        @HeaderParam("authorization") CurrentUser: String
    ) {
        try {
            return res.status(200).send(CurrentUser);
        } catch (error) {
            console.log("Error_in_getAccount::: ", error);
            if (error.httpCode === 400) {
                return res.status(400).send({ message: "Bad request" });
            } else if (error.httpCode === 401) {
                return res.status(401).send({ message: "Unauthorized" });
            }
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
}
