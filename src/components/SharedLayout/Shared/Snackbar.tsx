import { notification } from 'antd';

export const Snackbar = (message: string, description: string) => {
  return (
    notification.open({
      message,
      description,
    })
  )
};


