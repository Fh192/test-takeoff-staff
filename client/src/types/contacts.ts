export interface IContact {
  id: number;
  phone_number: string;
  name: string;
}

export type IContactOmitId = Omit<IContact, 'id'>;
