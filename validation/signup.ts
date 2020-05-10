import { object, string } from 'yup';

export const signupSchema = object().shape({
  firstName: string()
    .trim()
    .min(3, 'First name must be at least 3 characters')
    .max(40, 'Too long')
    .required('First name is required'),
  lastName: string()
    .trim()
    .min(3, 'Last name must be at least 3 characters')
    .max(40, 'Too long')
    .required('Last name is required'),
  email: string().trim().max(40, 'Too long').email('Invalid email').required('Email is required'),
  password: string()
    .max(40, 'Too long')
    .required('Password is required')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/, {
      message: `Use 7 - 15 characters, at least one numeric digit and a special character`,
    }),
});

export const initialValues = { firstName: '', lastName: '', email: '', password: '' };
