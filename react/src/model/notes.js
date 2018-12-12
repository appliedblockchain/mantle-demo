import Mantle from '@appliedblockchain/mantle-core'
import Web3 from 'web3'
import Contracts from 'details.js'
import api from 'utils/api'
import { utils } from 'web3'

const { bufferToHex0x } = Mantle.utils

/* ACTION */
const CREATE_NOTE = '@app/createNote'
const FETCH_NOTES = '@app/fetchNotes'

/* ACTION CREATORS */
export const fetchNotes = () => {
  return async (dispatch, getState) => {
    const { auth: { publicKey, mnemonic } } = getState()
    console.log('ENV', process.env)
    try {
      const result = await api.get('/notes')
      console.log('RESULT*', result)
    } catch (err) {

    }

    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    const contract = new web3.eth.Contract(Contracts.Notes.abi, Contracts.Notes.address)
    const count = await contract.methods.getNoteCount().call()
    const notes = []
    const mantle = new Mantle()
    mantle.loadMnemonic(mnemonic)
    for (let i = 0; i < count; i++) {
      const note = await contract.methods.getNote(i).call()
      const viewable = note.sharedWith.includes(publicKey)
      const index = note.sharedWith.indexOf(publicKey)
      const key = viewable ? Mantle.decrypt(note.encryptedKeys[index], mantle.privateKey) : null
      const decrypted = viewable ? Mantle.decryptSymmetric(note.encrypted, key) : note.encrypted

      notes.push({ ...note, decrypted, viewable })
    }

    dispatch({
      type: FETCH_NOTES,
      payload: notes
    })
  }
}

export const createNote = ({ tag, msg, sharedWith = [] }) => {
  return async (dispatch, getState) => {
    try {
      const { auth: { publicKey, address, mnemonic } } = getState()
      const mantle = new Mantle()
      mantle.loadMnemonic(mnemonic)
      const symmetricKey = Mantle.createSymmetricKey()
      const encrypted = bufferToHex0x(
        Mantle.encryptSymmetric(msg, symmetricKey)
      )
      console.log('pub', publicKey, publicKey.length)
      // sharedWith.push(Buffer.from(publicKey.slice(2), 'hex'))
      sharedWith.push(publicKey)
      console.log('**', sharedWith[0], sharedWith[0].length)
      console.log('COMP', Buffer.from(publicKey.slice(2), 'hex'), utils.hexToBytes(publicKey))
      const encryptedKeys = sharedWith.map(publicKey => bufferToHex0x(Mantle.encrypt(symmetricKey, publicKey)))
      console.log('SHARED WITH', sharedWith)
      console.log('ENCRUPTED KEYS', encryptedKeys)

      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      const from = await web3.eth.getCoinbase()
      const sendParams = { from, gas: 50000000 }
      const contract = new web3.eth.Contract(Contracts.Notes.abi, Contracts.Notes.address)
      await contract.methods.addNote(tag, encrypted, address, sharedWith, encryptedKeys).send(sendParams)
      // mantle.loadContract({ address: Contracts.Notes.address, abi: Contracts.Notes.abi, name: 'Notes' })
      // const rawTrx = await mantle.signTransaction({
      //   params: [ tag, encrypted, address, sharedWith, encryptedKeys ],
      //   contractName: 'Notes',
      //   methodName: 'addNote'
      // })

      // console.log('RAW', rawTrx)

      // const receipt = await web3.eth.sendSignedTransaction(rawTrx)
      // console.log('RECEIPT*', receipt)

      dispatch({
        type: CREATE_NOTE,
        payload: { tag, encrypted, encryptedKeys, publicKey, address }
      })
    } catch (err) {
      console.log('ERR', err)
    }
  }
}


const INITIAL_STATE = []

/* UPDATE */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return [ ...state, action.payload ]
    case FETCH_NOTES:
      return action.payload
    default:
      return state
  }
}

export default reducer
