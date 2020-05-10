import { object, string } from 'yup';

export const teamSchema = object().shape({
  name: string().trim().max(40, 'Too long').required('Name is required'),
  duties: string().trim().max(3000, 'Too long').required('Duties field is required'),
});

export const manageTeamLeadSchema = object().shape({
  name: string().required('Name is required'),
  start: string().required('Start date is required'),
  stop: string().required('Stop date is required'),
});

export const teamMembersInitialValues = [{ firstName: '', lastName: '', email: '' }];

export const initialValues = { name: '', duties: '' };
