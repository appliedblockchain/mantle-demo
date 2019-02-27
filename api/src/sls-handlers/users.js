'use strict'

const { contracts: { Users }, setupContracts } = require('../utils/web3')
const ignoreNumberedKeys = require('../utils/ignoreNumberedKeys')

module.exports.create = async (event) => {
  let body = {}
  try {
    body = JSON.parse(event.body)
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Could not parse request body.',
      }),
    }
  }
  const { params = [] } = body

  await setupContracts({ Users })

  const userId = Number(await Users.methods.getUserCount().call()) + 1
  const username = `User ${userId}`
  await Users.methods.addUser(...params, username).send()

  return {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  }
}


module.exports.list = async () => {
  await setupContracts({ Users })
  const count = await Users.methods.getUserCount().call()
  const promises = []
  for (let i = 0; i < count; i++) {
    const user = Users.methods.getUser(i).call()
    promises.push(user)
  }

  const users = (await Promise.all(promises)).map(ignoreNumberedKeys)

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  }
}
