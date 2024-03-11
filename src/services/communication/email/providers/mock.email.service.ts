import { Logger } from '../../../../common/logger';
import { EmailDetails } from "../email.details";
import path from "path";
import fs from "fs";
import { IEmailService } from "../email.service.interface";
import { SMTPEmailService } from "../providers/smtp.email.service";

///////////////////////////////////////////////////////////////////////////////////

export class MockEmailService implements IEmailService {

    sendEmail = async (emailDetails: EmailDetails, textBody: boolean): Promise<boolean> => {
        try {
            Logger.instance().log(`To emaiDetails: '${emailDetails}', Extra Message: '${textBody}'`);
            return Promise.resolve(true);
        } catch (error) {
            Logger.instance().log(error.message);
            return false;
        }
    };
}
