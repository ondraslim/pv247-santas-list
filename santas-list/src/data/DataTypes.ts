


export type Gift = {
  id: string;
  name: string;
  price?: number;
  description?: string;
};

export type Giftee = {
  id: string;
  name: string;
  note?: string;
  budget?: number;
  gift?: Gift;
}

export type GiftList = {
  id: string;
  name: string;
  user: string;
  recipients: Giftee[];   // TODO: rename to giftees
  gifts?: Gift[];         // TODO: is this necessary here?
}

