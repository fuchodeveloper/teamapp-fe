import { object, string } from 'yup';

export const teamSchema = object().shape({
  name: string().max(40, 'Too long').required('Name is required'),
  duties: string().max(3000, 'Too long').required('Duties field is required'),
});

export const createTeamMembersSchema = object().shape({
  firstName: string().max(40, 'Too long').required('First name is required'),
  lastName: string().max(40, 'Too long').required('Last name is required'),
  email: string().max(40, 'Too long').email('Invalid email').required('Email is required'),
});

export const teamMembersInitialValues = [{ firstName: '', lastName: '', email: ''}];

export const initialValues = { name: '', duties: '' };
