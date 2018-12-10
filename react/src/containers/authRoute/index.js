import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = ({ authenticated, ...props }) => (
  <>
    { authenticated ? <Route {...props}  /> : <Redirect to="/" /> }
  </>
)

const mapState = ({ mnemonic }) => ({
  authenticated: !!mnemonic
})

export default connect(mapState)(AuthRoute)
