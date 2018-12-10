import LoadMnemonic from './LoadMnemonic'
import { connect } from 'react-redux'
import { loadMnemonic } from 'model/mnemonic'

export default connect(null, {
  loadMnemonic: loadMnemonic
})(LoadMnemonic)
