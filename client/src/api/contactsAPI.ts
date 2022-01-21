import { IContact, IContactOmitId } from './../types/contacts';
import { instance } from './instance';

interface IUpdateContact {
  id: number;
  contact: IContactOmitId;
}

export const contactsAPI = {
  getContacts: async (q: string = '') => {
    const response = await instance.get<IContact[]>(`contacts?q=${q}`);

    return response.data;
  },

  updateContact: async ({ id, contact }: IUpdateContact) => {
    const response = await instance.put<IContact[]>(`contacts/${id}`, {
      contact,
    });

    return response.data;
  },

  addContact: async (contact: Omit<IContact, 'id'>) => {
    const response = await instance.post<IContact[]>(`/contacts`, { contact });

    return response.data;
  },

  deleteContact: async (id: number) => {
    const response = await instance.delete<IContact[]>(`/contacts/${id}`);

    return response.data;
  },
};
