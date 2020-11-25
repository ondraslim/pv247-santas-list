

export type GiftModel = {
  id: string;
  name: string;
  price: number;
  description?: string;
  for: RecipientModel
};

export type RecipientModel = {
  id: string;
  name: string;
  note: string;
  budget: number;
  gifts: GiftModel[];
}

export type GiftListModel = {
  id: string;
  name: string;
  recipients: RecipientModel[];
}

