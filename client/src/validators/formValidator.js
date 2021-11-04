import * as Yup from 'yup'

export const NAME = 'name'
export const NAME_LABEL = 'Name'

export const EMAIL = 'email'
export const EMAIL_LABEL = 'Email'

export const PASSWORD = 'password'
export const PASSWORD_LABEL = 'Password'

export const CONFIRM_PASSWORD = 'confirm_password'
export const CONFIRM_PASSWORD_LABEL = 'Confirm password'

export default Yup.object({
  [NAME]: Yup.string()
    .label(NAME_LABEL)
    .required()
    .min(1),
  [EMAIL]: Yup.string()
    .label(EMAIL_LABEL)
    .required()
    .email(),
  [PASSWORD]: Yup.string()
    .label(PASSWORD_LABEL)
    .required()
    .min(8),
  [CONFIRM_PASSWORD]: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .label(CONFIRM_PASSWORD_LABEL)
    .required()
    .min(8)
})
