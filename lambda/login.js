const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
    DynamoDBDocumentClient,
    GetCommand
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
            Key: {
                email: email
            }
        };

        const result = await dynamodb.send(
            new GetCommand(params)
        );

        if (!result.Item) {

            return {
                statusCode: 401,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    message: "User not found"
                })
            };

        }

        if (result.Item.password !== password) {

            return {
                statusCode: 401,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    message: "Invalid password"
                })
            };

        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: "Login successful"
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
                message: "Login failed"
            })
        };

    }
};
