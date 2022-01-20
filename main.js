#!node

const { ServiceBusClient } = require("@azure/service-bus");
require('dotenv').config();

(async () => {
    const connectionString = process.env["SB_CONNECTION_STRING"];

    if (!connectionString || process.argv.length < 5) {
        console.error("Usage: node main.js <topicName> <label> <body>");
        return -1;
    }

    var topicName = process.argv[2];
    var subject = process.argv[3];
    var body = process.argv[4]

    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(topicName);

    await sender.sendMessages({
        body,
        contentType: "application/json",
        subject
    });

    await sender.close();
    await sbClient.close();
})();
