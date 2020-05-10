import { object, string } from 'yup';

export const signinSchema = object().shape({
  email: string().trim().max(40, 'Too long').email('Invalid email').required('Email is required'),
  password: string()
    .trim()
    .max(40, 'Too long')
    .required('Password is required')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/, {
      message: `Use 7 - 15 characters, at least one numeric digit and a special character`,
    }),
});

export const initialValues = { email: '', password: '' };
