


export type Gift = {
  id: string;
  name: string;
  price?: number;
  description?: string;
};

export type Recipient = {
  id: string;
  name: string;
  note?: string;
  budget?: number;
  gift?: Gift;
}

export type GiftList = {
  id: string;
  name: string;
  recipients: Recipient[];
  gifts: Gift[];
}

