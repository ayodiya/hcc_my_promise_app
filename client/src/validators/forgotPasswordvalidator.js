import * as Yup from 'yup'

export const EMAIL = 'email'
export const EMAIL_LABEL = 'Email'

export default Yup.object({
  [EMAIL]: Yup.string()
    .label(EMAIL_LABEL)
    .required()
    .email()
})
