import React from 'react'
import SideMenu from 'components/sideMenu'
import Navlink from 'components/sideMenu/NavLink'
import {
  ENCRYPTION,
  VIEW_NOTES,
  CREATE_NOTE,
  HOME
} from 'routes'

const SideMenuContainer = () => {
  return (
    <SideMenu>
      <Navlink to={VIEW_NOTES}>View notes</Navlink>
      <Navlink to={CREATE_NOTE}>Create note</Navlink>
      <Navlink to={ENCRYPTION}>Encryption</Navlink>
      {/* @TODO: Move logout button to bottom of nav bar */}
      <Navlink to={HOME}>Logout</Navlink>
    </SideMenu>
  )
}

export default SideMenuContainer
