const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.get = async (event) => {
  const params = {
    TableName: 'notes',
    Key: {
      id: event.pathParameters.id
    }
  };

  const result = await dynamoDB.get(params).promise();
  console.log(result)
  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Couldn't find note"
      })
    }
  }
}