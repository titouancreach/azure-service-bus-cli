#!node

const { ServiceBusClient } = require("@azure/service-bus");
require('dotenv').config();

(async () => {
    const connectionString = process.env["SB_CONNECTION_STRING"];

    if (!connectionString || process.argv.length < 5) {
        console.error("Usage: node main.js <topicName> <label> <body>");
        return -1;
    }

    const topicName = process.argv[2];
    const subject = process.argv[3];
    const body = process.argv[4];

    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(topicName);

    await sender.sendMessages({
        body: JSON.parse(body),
        contentType: "application/json",
        subject
    });

    await sender.close();
    await sbClient.close();
})();
