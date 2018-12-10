import ViewNotes from './ViewNotes'
import { connect } from 'react-redux'

const mapState = ({ notes }) => ({
  notes
})

export default connect(mapState)(ViewNotes)
