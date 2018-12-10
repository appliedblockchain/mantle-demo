/* ACTION */
const LOAD_MNEMONIC = '@app/loadMnemonic'

/* ACTION CREATORS */
export const loadMnemonic = mnemonic => ({
  type: LOAD_MNEMONIC,
  payload: mnemonic
})

const INITIAL_STATE = ''

/* UPDATE */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_MNEMONIC:
      return action.payload
    default:
      return state
  }
}

export default reducer
