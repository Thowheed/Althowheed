import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Service } from "typedi";
import { getManager } from "typeorm-plus";

@Service()
@Middleware({ type: "before" })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    
    async use(req: any, res: any, next: (err?: any) => any): Promise<void> {
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
            const data = await this.checkAuthorization(authorization, req);
            console.log("data ===> ", data);

            if (!data) {
                res.status(401).send({ status: 401, message: "Unauthorized" });
                return;
            }

            // Example: Setting user data in request for use in subsequent middleware/controllers
            // req.user = data; // Set user data to request object
            console.log("error here");

            next(); // Continue to the next middleware/controller
            console.log("error after next")
        } catch (error) {
            console.log("Error in use method:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    async checkAuthorization(token: string, req: any): Promise<any | null> {
        try {
            const manager = getManager();
            const user = await manager.query(
                `SELECT * FROM account a WHERE a.appSecretToken = '${token}' AND a.isDeleted = 0`
            );

            // Assuming user is an array and we check if it's not empty
            if (user && user.length > 0) {
                req.headers.authorization = user;
                console.log("user", user);

                return user[0]; // Returning the first user found (adjust as per your query logic)
            } else {
                return null; // No user found
            }
        } catch (error) {
            console.log("Error in checkAuthorization:", error);
            throw error;
        }
    }
}
