import Box from '@mui/material/Box'

const InputFieldError = ({ errorText, ...props }) => {
  return (
    <Box
      pt='5px'
      pl='15px'
      fontSize='13px'
      color='#DC3545'
      sx={{ fontWeight: 'bold', fontFamily: 'Oswald' }}
      {...props}
    >
      {errorText}
    </Box>
  )
}

export default InputFieldError
