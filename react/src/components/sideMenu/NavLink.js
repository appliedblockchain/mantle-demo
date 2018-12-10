import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import { withRouter, Link } from 'react-router-dom'
import { compose } from 'recompose'

const styles = theme => ({
  default: { textAlign: 'center' },
  selectedTxt: { color: theme.palette.primary.main, textAlign: 'center' }
})

const NavLink = ({ to, location, children, classes }) => {
  const selected = location.pathname === to
  const rootProps = {
    to,
    divider: true,
    button: true,
    component: Link
  }

  return (
    <ListItem {...rootProps}>
      <ListItemText
        primary={children.toUpperCase()}
        classes={{ primary: selected ? classes.selectedTxt : classes.default }}
      />
    </ListItem>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired
}

export default compose(
  withRouter,
  withStyles(styles)
)(NavLink)
