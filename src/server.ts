require("dotenv").config();
import cors from 'cors';
import express, { Router } from 'express';
import { connect } from './data-source';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';
import http from 'http';
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';
import { getManager } from 'typeorm-plus';

const handleCors = (router: Router) =>
    router.use(cors({ origin: true }));

start()
    .then(() => {
        console.log("Application started...")
    })
    .catch((err: any) => {
        console.log("Failed to start application", err)
    })

async function start() {
    try {
        await connect();
        const app = express();
        // useContainer(Container);

        async function checkAuthorization(token: string): Promise<any | null> {
            try {
                const manager = getManager();
                const user = await manager.query(
                    `SELECT * FROM account a WHERE a.appSecretToken = '${token}' AND a.isDeleted = 0`
                );

                // Assuming user is an array and we check if it's not empty
                if (user && user.length > 0) {
                    return user[0]; // Returning the first user found (adjust as per your query logic)
                } else {
                    return null; // No user found
                }
            } catch (error) {
                console.log("Error in checkAuthorization:", error);
                throw error;
            }
        }

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json())

        const routingControllersOptions = {
            controllers: [__dirname + "/controller/*"],
            defaultErrorHandler: false,
            middlewares: [AuthenticationMiddleware]
        }

        handleCors(app);

        const server = await http.createServer(app)
        useExpressServer(app, routingControllersOptions)
        server.timeout = 300000;

        const port = 3000;
        server.listen(port, () => {
            console.log(`Server is running on http://localhost:${process.env.port}`);

        })
    } catch (error) {
        throw error;
    }
}