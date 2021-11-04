import Button from '@mui/material/Button'

const ButtonComponent = ({ buttonText, ...props }) => {
  return (
    <Button
      variant='contained'
      {...props}
      sx={{
        width: '150px',
        fontSize: '20px',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: '20px',
        backgroundColor: 'buttonSuccess.main',
        '&:hover': {
          backgroundColor: 'buttonSuccess.main'
        }
      }}
    >
      {buttonText}
    </Button>
  )
}

export default ButtonComponent
