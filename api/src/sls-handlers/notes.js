const ignoreNumberedKeys = require('../utils/ignoreNumberedKeys')
const { contracts: { Notes }, setupContracts } = require('../utils/web3')

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
  const { params } = body

  await setupContracts({ Notes })

  await Notes.methods.addNote(...params).send()
  return {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  }
}


module.exports.list = async () => {
  await setupContracts({ Notes })
  const count = await Notes.methods.getNoteCount().call()
  const promises = []
  for (let i = 0; i < count; i++) {
    const note = Notes.methods.getNote(i).call()
    promises.push(note)
  }

  const notes = (await Promise.all(promises)).map(ignoreNumberedKeys)

  return {
    statusCode: 200,
    body: JSON.stringify(notes.reverse()),
  }
}
