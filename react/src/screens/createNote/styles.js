import { SIDE_MENU_WIDTH } from 'components/sideMenu'

const styles = theme => {
  const { spacing: { unit } } = theme

  return {
    container: {
      marginLeft: `${SIDE_MENU_WIDTH}px`,
      padding: `${unit * 4}px`
    },
    paper: {
      padding: `${unit * 2}px`,
      wordBreak: 'break-word'
    },
    userPaper: {
      padding: `${unit * 2}px`,
      wordBreak: 'break-word',
      backgroundColor: '#1b2635'
    },
    marginBottom: {
      marginBottom: `${unit * 2}px`
    },
    alignRight: {
      textAlign: 'right'
    },
    sharing: {
      color: '#6cc3ce'
    }
  }
}

export default styles
