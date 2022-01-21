import { authSlice } from './authSlice';
import { contactsSlice } from './contactsSlice';

export const rootReducer = {
  [contactsSlice.name]: contactsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
};
