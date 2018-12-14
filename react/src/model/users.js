import Mantle from '@appliedblockchain/mantle-core'
import api from 'utils/api'

/* ACTION */
const CREATE_USER = '@app/createUser'
const FETCH_USERS = '@app/fetchUsers'

/* ACTION CREATORS */
export const createUser = mnemonic => {
  return async dispatch => {
    try {
      const mantle = new Mantle()
      mantle.loadMnemonic(mnemonic)

      const user = {
        addr: mantle.address,
        pubKey: mantle.getPublicKey('hex0x')
      }
      const { addr, pubKey } = user
      const { data } = await api.post('/users', {
        params: [
          addr,
          pubKey
        ]
      })

      dispatch({
        type: CREATE_USER,
        payload: data
      })
    } catch (err) {
      console.log('ERR', err)
    }
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    const { data: { count, users: fetchedUsers } } = await api.get('/users')

    const users = []
    // @TODO: Look into why the api result includes numeric keys and attempt to omit them
    // from the response so that we can simply do `const note = fetchedUsers[i]`
    for (let i = 0; i < count; i++) {
      const { name, pubKey, addr } = fetchedUsers[i]
      const user = { name, pubKey, addr }
      users.push(user)
    }

    dispatch({
      type: FETCH_USERS,
      payload: users
    })
  }
}

const INITIAL_STATE = []

/* UPDATE */
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload
    case CREATE_USER:
      return [ ...state, action.payload ]
    default:
      return state
  }
}

export default reducer
