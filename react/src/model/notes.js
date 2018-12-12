import Mantle from '@appliedblockchain/mantle-core'
import api from 'utils/api'

const { bufferToHex0x } = Mantle.utils

/* ACTION */
const CREATE_NOTE = '@app/createNote'
const FETCH_NOTES = '@app/fetchNotes'

/* ACTION CREATORS */
export const fetchNotes = () => {
  return async (dispatch, getState) => {
    const { auth: { publicKey, mnemonic } } = getState()
    const { data: { notes: fetchedNotes, count } } = await api.get('/notes')

    const mantle = new Mantle()
    mantle.loadMnemonic(mnemonic)

    const notes = []
    // @TODO: Look into why the api result includes numeric keys and attempt to omit them
    // from the response so that we can simply do `const note = fetchedNotes[i]`
    for (let i = 0; i < count; i++) {
      const {
        tag,
        encrypted,
        author,
        encryptedKeys,
        sharedWith
      } = fetchedNotes[i]

      const note = {
        tag,
        encrypted,
        author,
        encryptedKeys,
        sharedWith
      }

      const viewable = sharedWith.includes(publicKey)
      const index = sharedWith.indexOf(publicKey)
      const key = viewable ? Mantle.decrypt(encryptedKeys[index], mantle.privateKey) : null
      const decrypted = viewable ? Mantle.decryptSymmetric(encrypted, key) : encrypted

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
      const { auth: { publicKey, address } } = getState()

      const symmetricKey = Mantle.createSymmetricKey()
      const encrypted = bufferToHex0x(
        Mantle.encryptSymmetric(msg, symmetricKey)
      )

      sharedWith.push(publicKey)
      const encryptedKeys = sharedWith.map(publicKey => bufferToHex0x(
        Mantle.encrypt(symmetricKey, publicKey)
      ))

      await api.post('/notes', {
        params: [
          tag,
          encrypted,
          address,
          sharedWith,
          encryptedKeys
        ]
      })

      dispatch({
        type: CREATE_NOTE,
        payload: {
          tag,
          encrypted,
          encryptedKeys,
          publicKey,
          address
        }
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
