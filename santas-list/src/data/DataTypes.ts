

export type Gift = {
  id: string;
  name: string;
  price: number;
  description?: string;
  for: Recipient
};

export type Recipient = {
  id: string;
  name: string;
  note: string;
  budget: number;
  listId: string;
  gifts: Gift[];
}

export type GiftList = {
  id: string;
  name: string;
  recipients: Recipient[];
}

