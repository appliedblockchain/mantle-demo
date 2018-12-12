const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const compress = require('koa-compress')
const respond = require('koa-respond')
// const docs = require('@appliedblockchain/koa-docs')
const { middleware } = require('./router')
const logger = require('./logger')
const {
  notFoundHandler
  // errorHandler
  // assignToContext
} = require('./middleware')
// const setupWeb3 = require('./setupWeb3')
// const checkContractDeployment = require('./checkContractDeployment')
// const { healthcheck } = require('./healthcheck')

// const contracts = require('contracts')
const { web3, contracts, testDeployment } = require('src/utils/web3')
// const abi = contract.abi

const createServer = async () => {
  logger.debug('Creating server...')

  // await testDeployment()
  // Configure contracts
  const [ from ] = await web3.eth.getAccounts()
  contracts.Notes.options.from = from
  contracts.Users.options.from = from
  // const { contracts, web3 } = await setupWeb3({ abi, contractAddress })
  // await checkContractDeployment(web3, contractAddress, contract.contractName)


  const app = new Koa()

  app
    // .use(assignToContext({ contracts, web3 }))
    // .use(errorHandler)
    // .use(healthcheck(contractAddress, web3))
    .use(compress())
    .use(respond())
    .use(cors())
    .use(middleware)
    .use(notFoundHandler)

  const server = http.createServer(app.callback())

  server.on('close', async () => {
    logger.debug('Server closing')
  })

  server.on('error', async error => {
    console.log('Error', error)
  })

  logger.debug('Server created.')

  return server
}

module.exports = createServer
