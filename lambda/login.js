```javascript
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

        // User not found
        if (!result.Item) {

            return {
                statusCode: 401,

                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: "User not found"
                })
            };
        }

        // Password does not match
        if (result.Item.password !== password) {

            return {
                statusCode: 401,

                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: "Invalid password"
                })
            };
        }

        // Login successful
        return {
            statusCode: 200,

            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: "Login successful"
            })
        };

    } catch (error) {

        console.error("Login Error:", error);

        return {
            statusCode: 500,

            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: "Login failed"
            })
        };
    }
};
```
