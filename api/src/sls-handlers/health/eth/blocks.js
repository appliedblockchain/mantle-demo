const { web3 } = require('../../../utils/web3')

module.exports.getInfo = async () => {
  const latest = await web3.eth.getBlock('latest', false)
  return {
    statusCode: 200,
    body: JSON.stringify({
      latest
    }),
  }
}
