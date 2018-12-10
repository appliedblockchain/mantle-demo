import Mantle from '@appliedblockchain/mantle-core'

/* ACTION */
const CREATE_NOTE = '@app/createNote'

/* ACTION CREATORS */
export const createNote = ({ tag, msg }) => {
  return (dispatch, getState) => {
    const { auth } = getState()
    const symmetricKey = Mantle.createSymmetricKey()
    const encrypted = Mantle.encryptSymmetric(msg, symmetricKey)
    const encryptedKey = Mantle.encrypt(symmetricKey, auth.publicKey)

    dispatch({
      type: CREATE_NOTE,
      payload: { tag, encrypted, encryptedKey }
    })
  }
}


const INITIAL_STATE = []

/* UPDATE */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      return [ ...state, action.payload ]
    default:
      return state
  }
}

export default reducer
