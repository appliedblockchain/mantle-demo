/* ACTION */
const GENERATE_MNEMONIC = '@app/generateMnemonic'

/* ACTION CREATORS */
export const generateMnemonic = mnemonic => ({
  type: GENERATE_MNEMONIC,
  payload: mnemonic
})

const INITIAL_STATE = ''

/* UPDATE */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GENERATE_MNEMONIC:
      return action.payload
    default:
      return state
  }
}

export default reducer
