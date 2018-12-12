const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const compress = require('koa-compress')
const respond = require('koa-respond')
const { middleware } = require('./router')
const rootMiddleware = require('./routes/root')
const logger = require('./logger')
const { errorHandler, notFoundHandler } = require('./middleware')
const { healthcheck } = require('./healthcheck')
const { web3, contracts, testDeployment } = require('src/utils/web3')

const createServer = async () => {
  logger.debug('Creating server...')

  await testDeployment()

  /**
   * Configure contracts
   * @TODO:
   * Configure contracts in the src/utils/web3 file. This approach of configuring them on server start-up
   * instead of on web3 instantiation is difficult to reason about
   */
  const [ from ] = await web3.eth.getAccounts()
  const params = { from, gas: 50000000 }
  contracts.Notes.options = { ...contracts.Notes.options, ...params }
  contracts.Users.options = { ...contracts.Users.options, ...params }

  const contractAddresses = [
    contracts.Notes.options.address,
    contracts.Users.options.address
  ]

  const app = new Koa()

  app
    .use(compress())
    .use(errorHandler)
    .use(respond())
    .use(cors())
    .use(healthcheck(contractAddresses, web3))
    .use(rootMiddleware)
    .use(middleware)
    .use(notFoundHandler)

  const server = http.createServer(app.callback())

  server.on('close', async () => {
    logger.debug('Server closing')
  })

  server.on('error', async error => {
    logger.debug('Error', error)
  })

  logger.debug('Server created.')

  return server
}

module.exports = createServer
