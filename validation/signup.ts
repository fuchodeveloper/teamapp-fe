import { object, string } from 'yup';

export const signupSchema = object().shape({
  firstName: string().max(40, 'Too long').required('Field is required'),
  lastName: string().max(40, 'Too long').required('Field is required'),
  email: string().max(40, 'Too long').email('Invalid email').required('Field is required'),
  password: string().max(40, 'Too long').required('Field is required'),
});

export const initialValues = { firstName: '', lastName: '', email: '', password: '' };
