const styles = theme => {
  const { spacing: { unit } } = theme

  return {
    container: {
      marginLeft: '200px',
      padding: `${unit * 4}px`
    },
    paper: {
      padding: `${unit * 2}px`,
      wordBreak: 'break-word'
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
