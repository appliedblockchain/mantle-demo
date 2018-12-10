import Home from './Home'
import { connect } from 'react-redux'
import { loadMnemonic } from 'model/mnemonic'

export default connect(null, {
  loadMnemonic
})(Home)
