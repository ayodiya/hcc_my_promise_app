import * as Yup from 'yup'

export const PASSWORD = 'password'
export const PASSWORD_LABEL = 'Password'

export const CONFIRM_PASSWORD = 'confirm_password'
export const CONFIRM_PASSWORD_LABEL = 'Confirm Password'

export default Yup.object({
  [PASSWORD]: Yup.string()
    .label(PASSWORD_LABEL)
    .required()
    .min(8),
  [CONFIRM_PASSWORD]: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})
