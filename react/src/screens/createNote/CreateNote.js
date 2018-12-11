import React, { Component } from 'react'
import Text from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import styles from './styles'
import { withSnackbar } from 'notistack'
import { compose } from 'redux';
import IconButton from '@material-ui/core/IconButton'
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'
import Paper from '@material-ui/core/Paper'
import SideMenu from 'containers/sideMenu'
import { TextField } from 'components/formik'
import Button from '@material-ui/core/Button'
import { Formik, Form } from 'formik'
import Typography from '@material-ui/core/Typography'
import * as Yup from 'yup'
// import { IconButton } from '@material-ui/core';

const CreateNoteSchema = Yup.object().shape({
  tag: Yup.string()
    .required('Required'),
  msg: Yup.string()
    .min(10, 'Too short')
    .required('Required'),
  sharedWith: Yup.array()
})

class CreateNote extends Component {
  constructor(props) {
    super(props)
    this.state = { sharedWith: new Set() }
  }

  componentDidMount() {
    const { fetchUsers } = this.props
    fetchUsers()
  }

  toggleShare(address) {
    const { sharedWith } = this.state
    sharedWith.has(address)
      ? sharedWith.delete(address)
      : sharedWith.add(address)

    this.setState({ sharedWith })
  }

  render() {
    const sharedWith = Array.from(this.state.sharedWith)
    const { classes, users } = this.props 
    console.log('USERS', this.props.users)
    console.log('***', this.state)

    const onSubmit = async({ tag, msg, ...rest }, { resetForm }) => {
      console.log('*****', rest)
     try {
       const { createNote, enqueueSnackbar } = this.props 
       const note = { tag, msg, sharedWith }
       await createNote(note)
      //  enqueueSnackbar('Note successfully created', { variant: 'success' })
       resetForm({})
     } catch (err) {
      //  enqueueSnackbar('Note creation failed', { variant: 'error' })
     }
   }
  
    return (
      <div className={classes.container}>
        <SideMenu />
        <Grid container justify='center' spacing={24}>
          <Grid item xs={10}>
            <Typography variant='h2'>Create a note</Typography>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
                <Formik
                  initialValues={{ tag: '', msg: '' }}
                  validationSchema={CreateNoteSchema}
                  onSubmit={onSubmit}>
                    {(props) => (
                      <Form>
                        <Grid container spacing={24}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name='tag'
                              label="Tag"
                              variant='outlined'
                            />      
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name='msg'
                              label="Note"
                              variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.alignRight}>
                          <Button type='submit' color='primary' variant='contained' disabled={!props.isValid}>
                            Create
                          </Button>
                        </Grid> 
                      </Grid>
                    </Form>
                    )
                  }
              </Formik>
            </Paper>
          </Grid>
          </Grid>
  
          <Grid container justify='center' spacing={24}>         
            { users.length ? (
              users.map((user, idx) => (
                <Grid item xs={10} key={idx}>
                  <Paper className={classes.paper}>
                    <Typography variant='h5' className={classes.marginBottom}>
                      {user.name}
                      {this.state.sharedWith.has(user.addr) && <span className={classes.sharing}>&nbsp; (Sharing)</span>}
                    </Typography>
                    <Text className={classes.marginBottom}>Address: {user.addr}</Text>
                    <Text className={classes.marginBottom}>Public key: {user.pubKey}</Text>
                    <IconButton onClick={() => this.toggleShare(user.addr)}>
                      { this.state.sharedWith.has(user.addr)
                          ? <RemoveCircle />
                          : <AddCircle />
                      }
                    </IconButton>
                  </Paper>  
                </Grid>
              ))
            ) : null }
        </Grid>
      </div>
    )
  }
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(CreateNote)
