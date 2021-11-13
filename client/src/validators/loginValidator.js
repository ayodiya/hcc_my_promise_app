import * as Yup from 'yup'

export const EMAIL = 'email'
export const EMAIL_LABEL = 'Email'

export const PASSWORD = 'password'
export const PASSWORD_LABEL = 'Password'

export default Yup.object({
  [EMAIL]: Yup.string()
    .label(EMAIL_LABEL)
    .required()
    .email(),
  [PASSWORD]: Yup.string()
    .label(PASSWORD_LABEL)
    .required()
    .min(8)
})
