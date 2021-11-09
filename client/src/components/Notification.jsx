import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { forwardRef } from 'react'

const Alert = forwardRef(function Alert (props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Notifications = ({
  errorMsg,
  openSnackbar,
  handleCloseSnackbar,
  severity
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {errorMsg}
      </Alert>
    </Snackbar>
  )
}

export default Notifications
