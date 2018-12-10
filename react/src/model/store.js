import { createStore, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import window from 'global'
import mnemonic from './mnemonic'

const reducer = combineReducers({ mnemonic })

const persistConfig = { storage, key: 'root' }
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
