import Button from '@mui/material/Button'

const ButtonComponent = ({ buttonText, ...props }) => {
  return (
    <Button
      disableElevation
      variant='contained'
      {...props}
      sx={{
        width: '150px',
        fontSize: '20px',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: '15px',
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
