import React from 'react'
import SideMenu from 'components/sideMenu'
import Navlink from 'components/sideMenu/NavLink'
import {
  ENCRYPTION,
  VIEW_NOTES,
  CREATE_NOTE } from 'routes'

const SideMenuContainer = () => {
  return (
    <SideMenu>
      <Navlink to={ENCRYPTION}>Encryption</Navlink>
      <Navlink to={VIEW_NOTES}>View notes</Navlink>
      <Navlink to={CREATE_NOTE}>Create note</Navlink>
    </SideMenu>
  )
}

export default SideMenuContainer
