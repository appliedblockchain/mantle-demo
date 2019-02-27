module.exports.getInfo = () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      version: process.version
    }),
  }
}
