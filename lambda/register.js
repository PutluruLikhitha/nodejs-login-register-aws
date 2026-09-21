const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    PutCommand
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
    region: "ap-south-1"
});

const dynamodb = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {

    try {

        const body = JSON.parse(event.body);

        const email = body.email;
        const password = body.password;

        const params = {
            TableName: "Users",
            Item: {
                email: email,
                password: password
            }
        };

        await dynamodb.send(new PutCommand(params));

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Registration successful"
            })
        };

    } catch (error) {

        console.error(error);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: "Registration failed"
            })
        };

    }
};
