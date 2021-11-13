import * as Yup from 'yup'

export const NAME = 'name'
export const NAME_LABEL = 'Name'

export const EMAIL = 'email'
export const EMAIL_LABEL = 'Email'

export const PASSWORD = 'password'
export const PASSWORD_LABEL = 'Password'

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
    .min(8)
})
