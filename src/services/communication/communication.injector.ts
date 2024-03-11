import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { ConfigurationManager } from '../../config/configuration.manager';
import { MockMessagingService } from './messaging.service/providers/mock.messaging.service';
import { TwilioMessagingService } from './messaging.service/providers/twilio.messaging.service';
import { FirebaseNotificationService } from './notification.service/providers/firebase.notification.service';
import { MockNotificationService } from './notification.service/providers/mock.notification.service';
import { MockEmailService } from './email/providers/mock.email.service';
import { SMTPEmailService } from './email/providers/smtp.email.service';

////////////////////////////////////////////////////////////////////////////////

export class CommunicationInjector {

    public static registerInjections(container: DependencyContainer) {
        CommunicationInjector.injectSmsProvider(container);
        CommunicationInjector.injectNotificationProvider(container);
        CommunicationInjector.injectEmailProvider(container);
    }

    private static injectNotificationProvider(container: DependencyContainer) {
        const notificationProvider = ConfigurationManager.InAppNotificationServiceProvider();
        if (notificationProvider === 'Firebase') {
            container.register('INotificationService', FirebaseNotificationService);
        }
        else if (notificationProvider === 'Mock') {
            container.register('INotificationService', MockNotificationService);
        }
    }

    private static injectSmsProvider(container: DependencyContainer) {
        const smsProvider = ConfigurationManager.SMSServiceProvider();
        if (smsProvider === 'Twilio') {
            container.register('IMessagingService', TwilioMessagingService);
        }
        else if (smsProvider === 'Mock') {
            container.register('IMessagingService', MockMessagingService);
        }
    }

    private static injectEmailProvider(container: DependencyContainer) {
        const emailProvider = ConfigurationManager.EmailServiceProvider();
        if (emailProvider === 'SendGrid') {
            container.register('IEmailService', SMTPEmailService);
        }
        else if (emailProvider === 'Mock') {
            container.register('IEmailService', MockEmailService);
        }
    }

}
