import {
  CallApiType,
  ICallApiParameters,
  IResponseData,
} from 'src/type/CallApi';
import store from 'store';

const callApi: CallApiType = async ({
  url,
  data,
  method = 'post',
  upload = false,
}: ICallApiParameters): Promise<IResponseData> => {
  try {
    const body = upload ? data : JSON.stringify(data);
    const token = store.get('__cnt');

    const customHeader = { Authorization: token ? `Bearer ${token}` : '' };

    const response = await fetch(`${process.env.API_URL}${url}`, {
      headers: {
        ...customHeader,
        ...(!upload && { 'Content-Type': 'application/json' }),
      },
      method,
      body,
    });
    return await response.json();
  } catch (error) {
    return Promise.resolve({
      success: false,
      message: 'Server Error',
      status: 500,
      payload: {},
    });
  }
};

export default callApi;
