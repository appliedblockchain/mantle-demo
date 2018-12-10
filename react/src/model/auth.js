import Mantle from '@appliedblockchain/mantle-core'

/* ACTION */
const LOAD_MNEMONIC = '@app/loadMnemonic'

/* ACTION CREATORS */
export const loadMnemonic = mnemonic => ({
  type: LOAD_MNEMONIC,
  payload: mnemonic
})

const INITIAL_STATE = {
  mnemonic: '',
  publicKey: '',
  address: ''
}

/* UPDATE */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MNEMONIC: {
      const mnemonic = action.payload

      const mantle = new Mantle()
      mantle.loadMnemonic(mnemonic)

      const publicKey = mantle.getPublicKey('hex0x')
      const address = mantle.address

      return { ...state, mantle, mnemonic, publicKey, address }
    }
    default:
      return state
  }
}

export default reducer
