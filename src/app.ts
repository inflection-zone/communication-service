import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";
// import { Helper } from './common/helper';
import { Logger } from './common/logger';
import { ConfigurationManager } from "./config/configuration.manager";
// import { PrimaryDatabaseConnector } from './database/database.connector';
// import { Loader } from './startup/loader';
// import { DatabaseClient } from './common/database.utils/dialect.clients/database.client';
// import { DatabaseSchemaType } from './common/database.utils/database.config';
import { initializeRabbitMQ } from '../src/rabbitmq/rabbitmq.connection'

/////////////////////////////////////////////////////////////////////////

export default class MainApplication {

    public _app: express.Application;

    private static _instance: MainApplication;

    private constructor() {
        this._app = express();
    }

    public static instance(): MainApplication {
        return this._instance || (this._instance = new this());
    }

    public app(): express.Application {
        return this._app;
    }

    public start = async (): Promise<void> => {
        try {

            //Load configurations
            ConfigurationManager.loadConfigurations();

            //Load the modules
            //await Loader.init();

            //Connect databases
            //await connectDatabase_Primary();

            // RabbitMQ connection
            await initializeRabbitMQ()

            // if (process.env.NODE_ENV !== 'test') {
            //     //Set-up cron jobs
            //     await Loader.scheduler.schedule();
            // }

            process.on('exit', code => {
                Logger.instance().log(`Process exited with code: ${code}`);
            });

            //Start listening
            await this.listen();

        }
        catch (error) {
            Logger.instance().log('An error occurred while starting reancare-api service.' + error.message);
        }
    };

    private listen = () => {
        return new Promise((resolve, reject) => {
            try {
                const port = process.env.PORT;
                const server = this._app.listen(port, () => {
                    const serviceName = 'REANCare api' + '-' + process.env.NODE_ENV;
                    //const osType = Helper.getOSType();
                    //Logger.instance().log(`Operating system: ${osType}`);
                    Logger.instance().log(serviceName + ' is up and listening on port ' + process.env.PORT.toString());
                    this._app.emit("server_started");
                });
                module.exports.server = server;
                resolve(this._app);
            }
            catch (error) {
                reject(error);
            }
        });
    };

}

// async function connectDatabase_Primary() {
//     if (process.env.NODE_ENV === 'test') {
//         const databaseClient = Loader.container.resolve(DatabaseClient);
//         await databaseClient.dropDb(DatabaseSchemaType.Primary);
//     }
//     const primaryDatabaseConnector = Loader.container.resolve(PrimaryDatabaseConnector);
//     await primaryDatabaseConnector.init();
// }
