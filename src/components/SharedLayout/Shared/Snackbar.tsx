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
      style: {color, backgroundColor}
    })
  )
};


