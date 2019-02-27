const isPortReachable = require('is-port-reachable')

const ETHEREUM_JSONRPC_ENDPOINT = process.env.ETHEREUM_JSONRPC_ENDPOINT

module.exports.getInfo = async () => {
  const { port, hostname } = new URL(ETHEREUM_JSONRPC_ENDPOINT)

  return {
    statusCode: 200,
    body: JSON.stringify({
      jsonrpc: {
        reachable: await isPortReachable(parseInt(port, 10), { host: hostname })
      }
    }),
  }
}
