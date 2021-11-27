import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grow from '@mui/material/Grow'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Icon from '@mui/material/Icon'
import { Formik } from 'formik'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import Notification from './Notification'
import InputField from './InputField'
import InputFieldError from './InputFieldError'
import ButtonComponent from './ButtonComponent'
import apiCall from '../utils/apiCall'
import { setToken, getToken } from '../utils/localStorage'
import forgotPasswordvalidator, { EMAIL, EMAIL_LABEL } from '../validators/forgotPasswordvalidator'

const initialValues = {
  [EMAIL]: ''

}

const ForgotPassword = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [severity, setSeverity] = useState('')

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <>
      <Grow in>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignSelf: 'center',
              '& > :not(style)': {
                m: 1,
                minWidth: 350,
                minHeight: { xs: 400, md: 450 }
              }
            }}
          >
            <Paper
              elevation={6}
              sx={{
                backgroundColor: 'primary.main',
                borderRadius: '10px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '30px'
                  }}
                >
                  <Box
                    sx={{
                      color: 'white',
                      fontSize: '40px',
                      fontWeight: 900,
                      display: 'flex',
                      justifyContent: 'center',
                      paddingBottom: '20px'
                    }}
                  >
                    Forgot Password ?
                  </Box>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={forgotPasswordvalidator}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(true)

                      try {
                        const { data } = await apiCall(
                          'post',
                          'api/users/forgotPassword',
                          values
                        )
                        setSuccessMsg(data.msg)
                        setSeverity('success')
                        setOpenSnackbar(true)
                      } catch (error) {
                        setErrorMsg(error.response.data.msg)
                        setSeverity('error')
                        setOpenSnackbar(true)
                      }
                    }}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      isSubmitting,
                      handleBlur
                    }) => (
                      <Box
                        component='form'
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit}
                      >
                        <Box>
                          <Box>
                            <InputField
                              error={
                              touched[EMAIL] && errors[EMAIL] !== undefined
                            }
                              onBlur={handleBlur}
                              type='email'
                              name={EMAIL}
                              labelName={EMAIL_LABEL}
                              onChange={handleChange}
                            />
                          </Box>
                          {errors[EMAIL] && touched[EMAIL] && (
                            <InputFieldError errorText={errors[EMAIL]} />
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '15px',
                            paddingBottom: '30px'
                          }}
                        >
                          <ButtonComponent
                            type='submit'
                            buttonText={
                              isSubmitting
                                ? (
                                  <CircularProgress sx={{ color: 'white' }} />
                                  )
                                : (
                                    'Submit'
                                  )
                            }
                          />
                        </Box>
                      </Box>
                    )}
                  </Formik>
                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly', color: 'white', fontSize: '20px' }}>
                    <Box
                      component={Link} sx={{
                        paddingLeft: '10px',
                        fontWeight: 800,
                        color: 'white',
                        textDecoration: 'underline'
                      }} to='/login'
                    >LOGIN
                    </Box>
                    <Box
                      component={Link} sx={{
                        paddingLeft: '10px',
                        fontWeight: 800,
                        color: 'white',
                        textDecoration: 'underline'
                      }} to='/register'
                    >REGISTER
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Grow>
      <Notification
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        errorMsg={errorMsg || successMsg}
        severity={severity}
      />
    </>
  )
}

export default ForgotPassword
