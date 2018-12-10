/* ACTION */
const CREATE_NOTE = '@app/createNote'

/* ACTION CREATORS */
export const createNote = ({ tag, msg }) => ({
  type: CREATE_NOTE,
  payload: { tag, msg }
})

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
