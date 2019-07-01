const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const client = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event) => {
  const data = JSON.parse(event.body);
  
  const params = {
    TableName: 'notes',
    Item: {
      id: uuid(),
      text: data.text,
    }
  }

  await client.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

module.exports.get = async (event) => {
  const params = {
    TableName: 'notes',
    Key: {
      id: event.pathParameters.id
    }
  };

  const result = await client.get(params).promise();
  
  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Couldn\'t find this note' })
    }
  };
}