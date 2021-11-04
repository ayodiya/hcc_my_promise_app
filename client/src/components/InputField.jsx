import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const InputField = ({ labelName, type, ...props }) => {
  return (
    <TextField
      type={type}
      {...props}
      sx={{
        backgroundColor: '#113a9f',
        borderRadius: '10px',
        '& .MuiOutlinedInput-input': {
          color: 'white',
          borderRadius: '10px'
        }
      }}
      label={<Box sx={{ color: 'white' }}>{labelName}</Box>}
      variant='outlined'
    />
  )
}

export default InputField
