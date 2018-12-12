const Web3 = require('web3')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')

const contractsJSON = require('contracts')

const web3 = new Web3(ETHEREUM_JSONRPC_ENDPOINT)
const Notes = new web3.eth.Contract(contractsJSON.Notes.abi, contractsJSON.Notes.address)
const Users = new web3.eth.Contract(contractsJSON.Users.abi, contractsJSON.Users.address)

const contracts = { Notes, Users }

// @TODO: Dynamically check contract codes
const testDeployment = async () => {
  const NotesCode = await web3.eth.getCode(contractsJSON.Notes.address)
  const UsersCode = await web3.eth.getCode(contractsJSON.Users.address)

  if (NotesCode === '0x0' || NotesCode === '0x' || UsersCode === '0x0' || UsersCode === '0x') {
    throw new Error('No code at the specified contract addresses')
  }
}

module.exports = {
  web3,
  contracts,
  testDeployment
}
