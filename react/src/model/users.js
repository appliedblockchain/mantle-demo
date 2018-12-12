import Web3 from 'web3'
import Contracts from 'details.js'

/* ACTION */
const FETCH_USERS = '@app/fetchUsers'

/* ACTION CREATORS */
export const fetchUsers = () => {
  return async dispatch => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    const contract = new web3.eth.Contract(Contracts.Users.abi, Contracts.Users.address)
    const count = await contract.methods.getUserCount().call()
    const users = []

    for (let i = 0; i < count; i++) {
      const user = await contract.methods.getUser(i).call()
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
    default:
      return state
  }
}

export default reducer
