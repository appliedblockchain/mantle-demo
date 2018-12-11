import Mantle from '@appliedblockchain/mantle-core'
import Web3 from 'web3'
import Contracts from 'details.js'
const { bufferToHex0x } = Mantle.utils

/* ACTION */
const CREATE_NOTE = '@app/createNote'
const FETCH_NOTES = '@app/fetchNotes'

/* ACTION CREATORS */
export const fetchNotes = () => {
  return async (dispatch, getState) => {
    const { auth: { publicKey, mnemonic } } = getState()
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    const contract = new web3.eth.Contract(Contracts.Notes.abi, Contracts.Notes.address)
    const count = await contract.methods.getNoteCount().call()
    const notes = []
    const mantle = new Mantle()
    mantle.loadMnemonic(mnemonic)
    for (let i = 0; i < count; i++) {
      const note = await contract.methods.getNote(i).call()
      const viewable = note.sharedWith.includes(publicKey)
      console.log('VIEWABLE', viewable, mantle.getPrivateKey('hex'))
      const key = viewable ? Mantle.decrypt(note.encryptedKeys[0], mantle.privateKey) : note.encryptedKey
      console.log('*')
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
      console.log(1111, sharedWith)
      const { auth: { publicKey, address } } = getState()
      const symmetricKey = Mantle.createSymmetricKey()
      const encrypted = bufferToHex0x(
        Mantle.encryptSymmetric(msg, symmetricKey)
      )

      sharedWith.push(publicKey)
      const encryptedKeys = sharedWith.map(publicKey => bufferToHex0x(Mantle.encrypt(symmetricKey, publicKey)))
      // const encryptedKey= bufferToHex0x(
      //   Mantle.encrypt(symmetricKey, publicKey)
      // )
      console.log('SHARED WITH', sharedWith)
      console.log('keys', encryptedKeys)

      const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      const from = await web3.eth.getCoinbase()
      const sendParams = { from, gas: 50000000 }
      console.log('*')
      const contract = new web3.eth.Contract(Contracts.Notes.abi, Contracts.Notes.address)
      await contract.methods.addNote(tag, encrypted, address, sharedWith, encryptedKeys).send(sendParams)
      console.log('**')

      dispatch({
        type: CREATE_NOTE,
        payload: { tag, encrypted, encryptedKeys, publicKey, address }
      })
    } catch (err) {
      console.log('ERRRRR', err)
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
