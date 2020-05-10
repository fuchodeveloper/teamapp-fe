import { store } from 'react-notifications-component';

export const showNotification = ({ message, type }: { message: string; type: string }) => {
  return store.addNotification({
    // title: '',
    message,
    type, // success, danger, info, default, warning
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000,
      showIcon: true,
    },
  });
};
