export type ICallApiParameters = {
  url: string;
  method: 'post' | 'get';
  data?: {} | any;
  upload?: boolean;
  headers?: {} | any;
};

export type IResponseData = {
  success: boolean;
  message: string;
  status: number;
  payload: {} | any;
};

export type CallApiType = (param: ICallApiParameters) => Promise<IResponseData>;
