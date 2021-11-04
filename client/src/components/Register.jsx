import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Slide from '@mui/material/Slide'
import { Formik } from 'formik'
import { useParams } from 'react-router-dom'

import InputField from './InputField'
import InputFieldError from './InputFieldError'
import ButtonComponent from './ButtonComponent'
import formValidator, {
  NAME,
  NAME_LABEL,
  EMAIL,
  EMAIL_LABEL,
  PASSWORD,
  PASSWORD_LABEL
} from '../validators/formValidator'

const initialValues = {
  [NAME]: '',
  [EMAIL]: '',
  [PASSWORD]: ''
}

const Register = () => {
  const param = useParams()
  console.log(param)

  return (
    <Slide direction='right' in={true}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignSelf: 'center',
          '& > :not(style)': {
            m: 1,
            minWidth: 300,
            minHeight: { xs: 600, md: 550 }
          }
        }}
      >
        <Paper
          elevation={6}
          sx={{ backgroundColor: 'primary.main', borderRadius: '10px' }}
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
                Register
              </Box>
              <Formik
                initialValues={initialValues}
                validationSchema={formValidator}
              >
                {({
                  handleChange,
                  handleSubmit,
                  values,
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
                        error={touched[NAME] && errors[NAME] !== undefined}
                        onBlur={handleBlur}
                        name={NAME}
                        labelName={NAME_LABEL}
                        onChange={handleChange}
                      />
                      {errors[NAME] && touched[NAME] && (
                        <InputFieldError errorText={errors[NAME]} />
                      )}
                    </Box>
                    <Box>
                      <InputField
                        error={touched[EMAIL] && errors[EMAIL] !== undefined}
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
                          touched[PASSWORD] && errors[PASSWORD] !== undefined
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
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ButtonComponent type='submit' buttonText='Submit' />
                    </Box>
                  </Box>
                )}
              </Formik>
              <Box
                sx={{
                  display: 'flex',
                  paddingTop: '15px',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                Already registered ?
                <Box sx={{ paddingLeft: '10px', fontWeight: 800 }}>LOGIN</Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Slide>
  )
}

export default Register
