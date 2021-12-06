import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grow from '@mui/material/Grow'
import CircularProgress from '@mui/material/CircularProgress'
import { Formik } from 'formik'
import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'

import Notification from './Notification'
import InputField from './InputField'
import InputFieldError from './InputFieldError'
import ButtonComponent from './ButtonComponent'
import apiCall from '../utils/apiCall'
import { getToken, tokenName } from '../utils/localStorage'
import resetPasswordValidator, { PASSWORD, PASSWORD_LABEL, CONFIRM_PASSWORD, CONFIRM_PASSWORD_LABEL } from '../validators/resetPasswordValidator'

const initialValues = {
  [PASSWORD]: '',
  [CONFIRM_PASSWORD]: ''

}

const ResetPassword = () => {
  const { slug } = useParams()

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMsg, setSnackbarMsg] = useState('')
  const [severity, setSeverity] = useState('')
  const [user, setUser] = useState('')
  const token = getToken(tokenName)

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const decodeToken = useCallback(async () => {
    try {
      const { data } = await apiCall(
        'get',
        '/api/users/decodetoken',
        '',
        {
          Bearer: slug
        }
      )
      setUser(data.user._id)
    } catch (error) {
      setSnackbarMsg(error.response.data)
      setOpenSnackbar(true)
      setSeverity('error')
    }
  }, [slug])

  useEffect(() => {
    decodeToken()
  }, [])

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
                minWidth: 300,
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
                    Reset Password
                  </Box>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={resetPasswordValidator}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(true)

                      try {
                        const { data } = await apiCall(
                          'post',
                          '/api/users/resetPassword',
                          values,
                          {
                            Bearer: token
                          }
                        )

                        setSnackbarMsg(data.msg)
                        setSeverity('success')
                        setOpenSnackbar(true)
                      } catch (error) {
                        setSnackbarMsg(error.response.data.msg)
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
                              touched[PASSWORD] && errors[PASSWORD] !== undefined
                            }
                              onBlur={handleBlur}
                              type='password'
                              name={PASSWORD}
                              labelName={PASSWORD_LABEL}
                              onChange={handleChange}
                            />
                          </Box>
                          {errors[PASSWORD] && touched[PASSWORD] && (
                            <InputFieldError errorText={errors[PASSWORD]} />
                          )}
                        </Box>
                        <Box>
                          <Box>
                            <InputField
                              error={
                              touched[CONFIRM_PASSWORD] && errors[CONFIRM_PASSWORD] !== undefined
                            }
                              onBlur={handleBlur}
                              type='password'
                              name={CONFIRM_PASSWORD}
                              labelName={CONFIRM_PASSWORD_LABEL}
                              onChange={handleChange}
                            />
                          </Box>
                          {errors[CONFIRM_PASSWORD] && touched[CONFIRM_PASSWORD] && (
                            <InputFieldError errorText={errors[CONFIRM_PASSWORD]} />
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
        msg={snackbarMsg}
        severity={severity}
      />
    </>
  )
}

export default ResetPassword
