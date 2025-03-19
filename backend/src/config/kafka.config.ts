import { Consumer, Kafka, KafkaConfig, logLevel, Producer } from "kafkajs";

// Kafka configuration
export const kafka = new Kafka({
    clientId: 'chat-app', // Unique identifier for your client
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'], // Use environment variable or default to localhost
    logLevel: logLevel.ERROR, // Set log level to ERROR
});

// Create a producer instance
export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({ groupId: 'chats' });
export const connectKafkaProducer=async()=>{
   await producer.connect();
   console.log("kafka producer connected");
}