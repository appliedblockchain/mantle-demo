import Mnemonic from './Mnemonic'
import { connect } from 'react-redux'

const mapStateToProps = ({ mnemonic }) => ({ mnemonic })

export default connect(mapStateToProps)(Mnemonic)
