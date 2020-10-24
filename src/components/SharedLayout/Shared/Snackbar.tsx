import { notification } from 'antd';

export const Snackbar = (
  message: string,
  description: string,
  color: string,
  backgroundColor: string
  ) => {
  return (
    notification.open({
      message,
      description,
      duration: 0,
      style: {color, backgroundColor}
    })
  )
};


