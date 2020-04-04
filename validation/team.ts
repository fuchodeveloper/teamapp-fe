import { object, string } from 'yup';

export const teamSchema = object().shape({
  name: string().max(40, 'Too long').required('Name is required'),
  duties: string().max(3000, 'Too long').required('Duties field is required'),
});

export const initialValues = { name: '', duties: '' };
