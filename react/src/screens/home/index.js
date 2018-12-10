import Home from './Home'
import { connect } from 'react-redux'
import { generateMnemonic } from 'model/mnemonic'

export default connect(null, {
  generateMnemonic
})(Home)
