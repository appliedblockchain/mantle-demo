import Encryption from './Encryption'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  mnemonic: state.mnemonic
})

export default connect(mapStateToProps)(Encryption)
