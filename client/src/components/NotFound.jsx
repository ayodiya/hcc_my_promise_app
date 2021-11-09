import Box from '@mui/material/Box'

import NotFoundImg from '../assets/image/notFound.png'

const NotFound = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}
    >
      <img src={NotFoundImg} width='100%' height='30%' alt=' 404 not found' />
    </Box>
  )
}

export default NotFound
