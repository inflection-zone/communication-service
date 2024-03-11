import path from "path";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { IEmailService } from "./email.service.interface";
import { SMTPEmailService } from "./providers/smtp.email.service";
import { EmailDetails } from "./email.details";

@injectable()
export class EmailService {

    private _emailService: IEmailService;

    constructor(@inject('IEmailService') private _service: IEmailService) {
        //this._emailService = new SMTPEmailService(); //Hardcoded for now
    }

    sendEmail = async (emailDetails: EmailDetails, textBody: boolean): Promise<boolean> => {
        return await this._service.sendEmail(emailDetails, textBody);
    };

    getTemplate = async (templateName: string): Promise<string> => {
        const cwd = process.cwd();
        const filePath = path.join(cwd, 'assets/email.templates/', templateName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Template ${templateName} does not exist`);
        }
        const body = fs.readFileSync(filePath, 'utf8');
        return body;
    };

}
