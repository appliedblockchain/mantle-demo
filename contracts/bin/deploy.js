const fs = require('fs')
const { join } = require('path')
const Web3 = require('web3')
const config = require('config')
const PROVIDER = config.get('provider')
const FROM = config.get('from')

const directory = join(__dirname, '../build/contracts')
const files = fs
  .readdirSync(directory)
  .filter(d => /\.json$/.test(d))

const contracts = {}
files.forEach(file => {
  const filePath = join(directory, file)
  const fileContent = fs.readFileSync(filePath)

  try {
    const contract = JSON.parse(fileContent)
    contracts[contract.contractName] = contract
  } catch (err) {
    console.error(`Cannot parse file: ${file}`)
    process.exit(1)
  }
})

;(async () => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER))
    const coinbase = await web3.eth.getCoinbase()
    const from = FROM || coinbase
    const sendParams = { from, gas: 50000000 }

    const deployContract = async (contracts, contractName) => {
      const { abi, bytecode } = contracts[contractName]
      const contract = new web3.eth.Contract(abi, { from, data: bytecode })
      return contract.deploy({ arguments: [] }).send(sendParams)
    }

    const Notes = await deployContract(contracts, 'Notes')

    const contractsJSON = `module.exports = ${
      JSON.stringify({
        Notes: { address: Notes.options.address }
      }, null, 2).replace(/"/g, '\'')
    }\n`

    const path = join(__dirname, '../details.js')
    fs.writeFileSync(path, contractsJSON)
    console.log(`Contract information saved at ${path}`)
  } catch (err) {
    err.message === 'Invalid JSON RPC response: ""'
      ? console.error('Error: Unable to connect to network, is parity running?')
      : console.error(err)
  }
})()
