import "reflect-metadata"
import { createConnection, useContainer } from "typeorm"
import { createConnections } from "typeorm-plus";
import { Container } from "typeorm-typedi-extensions";

let connections;
export async function connect() {
    try {

            const AppDataSource = Object.assign({
            type: "sqlite",
            database: "C:/Learnings/Learnings/assgn.db/assgn.sqlite",
            synchronize: false,
            logging: "all",
            entities: [__dirname + "/entity/*.js"],
        })

        const AllDatabases: any = [AppDataSource];

        useContainer(Container)

        try {
            connections = await createConnections(AllDatabases)
            console.log("connections", connections);

        } catch (error) {
            console.log("db error ::::", error);

        }

        if (AppDataSource) {
            console.log("created successfully");

        }
        return AppDataSource;
    } catch (error) {
        console.log("Error_in_Connection:::", error);

    }
};

