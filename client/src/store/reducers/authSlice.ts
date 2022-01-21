import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../api/authAPI';
import { ILogin } from '../../types/auth';

interface IAuthState {
  isAuth: boolean;
  fetching: boolean;
  error: null | string;
}

const initialState: IAuthState = {
  isAuth: false,
  fetching: false,
  error: null,
};

export const login = createAsyncThunk<string, ILogin, { rejectValue: string }>(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    const { error, login } = await authAPI.login(loginData);

    if (!error) {
      return login;
    } else {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: b => {
    b.addCase(login.fulfilled, state => {
      state.isAuth = true;
      state.fetching = false;
    });

    b.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
      state.fetching = false;
    });
    b.addCase(login.pending, state => {
      state.fetching = true;
    });
  },
});

export const { setError } = authSlice.actions;
