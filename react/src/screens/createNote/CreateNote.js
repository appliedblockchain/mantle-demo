import React from 'react'
import Text from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import styles from './styles'
import { withSnackbar } from 'notistack'
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper'
import SideMenu from 'containers/sideMenu'
import { TextField } from 'components/formik'
import Button from '@material-ui/core/Button'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const CreateNote = ({ classes, createNote }) => {
  const onSubmit = ({ tag, msg }) => {
    const note = { tag, msg }
    createNote(note)
  }

  const CreateNoteSchema = Yup.object().shape({
    tag: Yup.string()
      .required('Required'),
    note: Yup.string()
      .min(10, 'Too short')
      .required('Required')
  })

  return (
    <div className={classes.container}>
      <SideMenu />
      <Grid container justify='center' spacing={24}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Text className={classes.heading}>Create a new note</Text>
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
                            Create note
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
    </div>
  )
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(CreateNote)
