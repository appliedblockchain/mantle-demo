import CreateNote from './CreateNote'
import { connect } from 'react-redux'
import { createNote } from 'model/notes'

export default connect(null, {
  createNote
})(CreateNote)
