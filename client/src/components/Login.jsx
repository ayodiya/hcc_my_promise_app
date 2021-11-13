import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import CircularProgress from '@mui/material/CircularProgress'
import Icon from '@mui/material/Icon'
import FacebookIcon from '@mui/icons-material/Facebook'
import { FcGoogle } from 'react-icons/fc'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'

import Notification from './Notification'
import InputField from './InputField'
import InputFieldError from './InputFieldError'
import ButtonComponent from './ButtonComponent'
import SocialButton from './SocialButton'
import apiCall from '../utils/apiCall'
import { setToken, getToken } from '../utils/localStorage'
import loginValidator, {
  EMAIL,
  EMAIL_LABEL,
  PASSWORD,
  PASSWORD_LABEL
} from '../validators/loginValidator'

const initialValues = {
  [EMAIL]: '',
  [PASSWORD]: ''
}

const Login = () => {
  const navigate = useNavigate()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (getToken('MyPromiseApp') !== null) {
      return navigate('/')
    }
  })

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const handleSocialLogin = async user => {
    const { email, id } = user.profile

    const dataToSubmit = {
      email: email,
      password: id
    }

    try {
      const { data } = await apiCall('post', 'api/users/login', dataToSubmit)

      setToken('MyPromiseApp', data.token)
      navigate('/')
    } catch (error) {
      setErrorMsg(error.response.data.msg)
      setOpenSnackbar(true)
    }
  }

  return (
    <Fragment>
      <Slide direction='left' in={true}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignSelf: 'center',
              '& > :not(style)': {
                m: 1,
                minWidth: 300,
                minHeight: { xs: 600, md: 500 }
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
                      justifyContent: 'center'
                    }}
                  >
                    Login
                  </Box>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={loginValidator}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(true)

                      try {
                        const { data } = await apiCall(
                          'post',
                          'api/users/login',
                          values
                        )
                        setToken('MyPromiseApp', data.token)
                        navigate('/')
                      } catch (error) {
                        setErrorMsg(error.response.data.msg)
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
                          flexDirection: 'column'
                        }}
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit}
                      >
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
                          {errors[EMAIL] && touched[EMAIL] && (
                            <InputFieldError errorText={errors[EMAIL]} />
                          )}
                        </Box>
                        <Box>
                          <InputField
                            error={
                              touched[PASSWORD] &&
                              errors[PASSWORD] !== undefined
                            }
                            onBlur={handleBlur}
                            name={PASSWORD}
                            type='password'
                            labelName={PASSWORD_LABEL}
                            onChange={handleChange}
                          />
                          {errors[PASSWORD] && touched[PASSWORD] && (
                            <InputFieldError errorText={errors[PASSWORD]} />
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '15px',
                            paddingBottom: '20px'
                          }}
                        >
                          <ButtonComponent
                            type='submit'
                            buttonText={
                              isSubmitting ? (
                                <CircularProgress sx={{ color: 'white' }} />
                              ) : (
                                'Submit'
                              )
                            }
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px'
                          }}
                        >
                          Login with
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly'
                          }}
                        >
                          <SocialButton
                            type='button'
                            provider='facebook'
                            appId='2688787724762125'
                            onLoginSuccess={handleSocialLogin}
                            // onLoginFailure={handleSocialLoginFailure}
                          >
                            <Box sx={{ alignItems: 'center' }}>
                              <FacebookIcon
                                sx={{
                                  color: 'blue',
                                  alignSelf: 'center',
                                  fontSize: '40px'
                                }}
                              />
                            </Box>
                          </SocialButton>
                          <SocialButton
                            type='button'
                            provider='google'
                            appId='323886703000-ceqb0hosab349j66amfdsi34bubeuora.apps.googleusercontent.com'
                            onLoginSuccess={handleSocialLogin}
                            // onLoginFailure={handleSocialLoginFailure}
                          >
                            <Box sx={{ alignItems: 'center' }}>
                              <Icon
                                sx={{
                                  color: 'blue',
                                  alignSelf: 'center',
                                  fontSize: '40px'
                                }}
                              >
                                <FcGoogle />
                              </Icon>
                            </Box>
                          </SocialButton>
                        </Box>
                      </Box>
                    )}
                  </Formik>
                  <Box
                    sx={{
                      display: 'flex',
                      paddingTop: '20px',
                      paddingBottom: '50px',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    Already registered ?
                    <Link to='/register' style={{ textDecoration: 'none' }}>
                      <Box
                        sx={{
                          paddingLeft: '10px',
                          fontWeight: 800,
                          color: 'white',
                          textDecoration: 'underline'
                        }}
                      >
                        REGISTER
                      </Box>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Slide>
      <Notification
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        errorMsg={errorMsg}
        severity='error'
      />
    </Fragment>
  )
}

export default Login
