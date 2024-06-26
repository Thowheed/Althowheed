import { JsonController, Post, Body, HeaderParam, Res, Get, Authorized, CurrentUser } from "routing-controllers";
import { Response } from 'express';
import DestinationLogic from "../businessLogic/destinationLogic";

let destination = new DestinationLogic();
@JsonController("/server/api")
export class DestinationController {


    //api to create destination
    @Post('/destination')
    async createOrUpdateDestinatio(
        @Body() requestBody: JSON,
        @Res() res: Response,
        @HeaderParam("authorization") CurrentUser: String
    ) {
        try {
            console.log("Inside_controller", requestBody, CurrentUser);
            let result = await destination.createOrUpdateDestinationLogic(requestBody, CurrentUser);
            console.log("result===>", result);
            return res.status(200).send(result);
        } catch (error) {
            console.log("Error_in_createOrUpdateClient::: ", error);
            // Handle specific HTTP errors
            if (error.httpCode === 400) {
                return res.status(400).send({ message: "Bad request" });
            } else if (error.httpCode === 401) {
                return res.status(401).send({ message: "Unauthorized" });
            }
            // Default error handling
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }

    //api to get all specific account destination
    @Get('/getDestination')
    async getDestination(
        @Body() requestBody: JSON,
        @Res() res: Response,
        @HeaderParam("authorization") CurrentUser: String
    ) {
        try {
            console.log("Inside_controller", requestBody, CurrentUser);
            let result = await destination.findDestinationById(requestBody);
            return res.status(200).send(result);
        } catch (error) {
            console.log("Error_in_createOrUpdateClient::: ", error);
            // Handle specific HTTP errors
            if (error.httpCode === 400) {
                return res.status(400).send({ message: "Bad request" });
            } else if (error.httpCode === 401) {
                return res.status(401).send({ message: "Unauthorized" });
            }
            // Default error handling
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
}
