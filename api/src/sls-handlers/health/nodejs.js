module.exports.getInfo = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      version: process.version
    }),
  }
}
