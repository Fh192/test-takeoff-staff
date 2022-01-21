import { ILogin, ILoginResponse } from '../types/auth';
import { instance } from './instance';

export const authAPI = {
  login: async (loginData: ILogin) => {
    const response = await instance.post<ILoginResponse>(
      `/auth/login`,
      loginData
    );

    return response.data;
  },
};
