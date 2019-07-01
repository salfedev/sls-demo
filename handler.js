module.exports.health = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Up and running'
    })
  };
}