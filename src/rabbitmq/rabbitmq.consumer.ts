import { getRabbitMQConnection } from "./rabbitmq.connection";
import { EmailService } from '../services/communication/email/email.service';
import { MessagingService } from '../services/communication/messaging.service/messaging.service'
import { Channel } from 'amqplib';
import { IMessagingService } from "../services/communication/messaging.service/messaging.service.interface";
import { inject, injectable } from "tsyringe";
import { MockMessagingService } from "../../src/services/communication/messaging.service/providers/mock.messaging.service";
import { NotificationService } from "../../src/services/communication/notification.service/notification.service";
import { MockNotificationService } from "../../src/services/communication/notification.service/providers/mock.notification.service";


export async function consumeEmailNotificationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_bp_message_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendSMS(messageContent.PhoneNumber, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

// #####  message service

//bp controller
export async function consumeBPMessagesFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_bp_message_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendSMS(messageContent.PhoneNumber, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

//statistic controlle
export async function consumeMessagesForReportUpdateFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_message_for_report_update_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendSMS(messageContent.PhoneNumber, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

//aha actions
export async function consumeSechudleHsSurveyFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_sechudle_survey_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendSMS(messageContent.PhoneNumber, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}
// community network
export async function consumeReminderOnNoActionToDonationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_reminder_action_donation_request_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendWhatsappWithReanBot(messageContent.PhoneNumber, messageContent.Message, messageContent.provider, messageContent.type, messageContent.planCode, messageContent.Payload);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

export async function consumeReminderOnNoActionToFifthDayFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_reminder_action_donation_fifth_day_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendWhatsappWithReanBot(messageContent.PhoneNumber, messageContent.Message, messageContent.provider, messageContent.type, messageContent.planCode, messageContent.Payload);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

// care plan
export async function consumeSechudleDailyCarePlanPushTasksFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_sechudle_daily_careplan_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendWhatsappWithReanBot(messageContent.PhoneNumber, messageContent.Message, messageContent.provider, messageContent.type, messageContent.planCode, messageContent.Payload);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

//user service

export async function consumeGenerateOtpFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_generate_otp_queue';
        await channel.assertQueue(queueName, { durable: true });


        const messagingService = new MessagingService(new MockMessagingService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await messagingService.sendSMS(messageContent.PhoneNumber, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}


// #### Notification Service

//ahr actions
export async function consumeNotificationCarePlanRegistrationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_care_plan_registration_reminder_queue';
        await channel.assertQueue(queueName, { durable: true });


        const notificationService = new NotificationService(new MockNotificationService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await notificationService.sendNotificationToDevice(messageContent.DeviceToken, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

export async function consumeSendNotificationToDeviceFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_notification_device_queue';
        await channel.assertQueue(queueName, { durable: true });


        const notificationService = new NotificationService(new MockNotificationService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await notificationService.sendNotificationToDevice(messageContent.DeviceToken, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

export async function consumeSendStrokeSurveyNotificationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_stroke_survey_notification_queue';
        await channel.assertQueue(queueName, { durable: true });


        const notificationService = new NotificationService(new MockNotificationService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await notificationService.sendNotificationToDevice(messageContent.DeviceToken, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

// blood pressure 

export async function consumeBPNotificationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_blood_pressure_notification_queue';
        await channel.assertQueue(queueName, { durable: true });


        const notificationService = new NotificationService(new MockNotificationService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await notificationService.sendNotificationToDevice(messageContent.DeviceToken, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

// medication consumption service

export async function consumeMedicationReminderNotificationFromQueue(): Promise<void> {
    try {
        // Create a channel from the connection
        const connection = await getRabbitMQConnection();
        const channel = await connection.createChannel();

        // Specify the queue name
        const queueName = 'send_medication_reminder_queue';
        await channel.assertQueue(queueName, { durable: true });


        const notificationService = new NotificationService(new MockNotificationService());

        // Set up the message consumer
        channel.consume(queueName, async (message) => {
            if (message !== null) {
                try {
                    const messageContent = JSON.parse(message.content.toString());
                    const result = await notificationService.sendNotificationToDevice(messageContent.DeviceToken, messageContent.Message);

                    // Acknowledge the message to remove it from the queue
                    channel.ack(message);

                    // Send a reply back
                    const replyContent = { result };
                    channel.sendToQueue(message.properties.replyTo,
                        Buffer.from(JSON.stringify(replyContent)),
                        { correlationId: message.properties.correlationId });
                } catch (error) {
                    console.error('Error processing message from RabbitMQ:', error);
                    channel.nack(message);
                }
            }
        });
    } catch (error) {
        console.error('Error consuming messages from RabbitMQ:', error);
        throw error;
    }
}

