import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { contactsAPI } from '../../api/contactsAPI';
import { IContact, IContactOmitId } from './../../types/contacts';

interface IContactsState {
  contacts: IContact[];
}
const initialState: IContactsState = {
  contacts: [],
};

export const getContacts = createAsyncThunk<IContact[], string | undefined>(
  'contacts/getContacts',
  async (q = '') => {
    const contacts = await contactsAPI.getContacts(q);
    return contacts.sort((a, b) => b.id - a.id);
  }
);

export const updateContact = createAsyncThunk<
  IContact[],
  { id: number; contact: IContactOmitId }
>('contacts/updateContact', async ({ id, contact }) => {
  const contacts = await contactsAPI.updateContact({ id, contact });
  return contacts.sort((a, b) => b.id - a.id);
});

export const deleteContact = createAsyncThunk<IContact[], number>(
  'contacts/deleteContact',
  async id => {
    const contacts = await contactsAPI.deleteContact(id);
    return contacts.sort((a, b) => b.id - a.id);
  }
);

export const addContact = createAsyncThunk<IContact[], Omit<IContact, 'id'>>(
  'contacts/addContact',
  async contact => {
    const contacts = await contactsAPI.addContact(contact);
    return contacts.sort((a, b) => b.id - a.id);
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: b => {
    b.addCase(getContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    b.addCase(addContact.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    b.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    b.addCase(updateContact.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
  },
});
