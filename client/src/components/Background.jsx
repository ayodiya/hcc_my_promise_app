import Box from '@mui/material/Box'

const Background = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
        minHeight: '100vh',
        fontFamily: 'Oswald',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {children}
    </Box>
  )
}

export default Background
