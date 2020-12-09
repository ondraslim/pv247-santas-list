


export type Gift = {
  id: string;
  name: string;
  price?: number;
  note?: string;
};

export type Giftee = {
  id: string;
  name: string;
  note?: string;
  budget?: number;
  gifts: Gift[];
}

export type GiftList = {
  id: string;
  name: string;
  user: string;
  recipients: Giftee[];   // TODO: rename to giftees
  gifts?: Gift[];         // TODO: is this necessary here?
}

export type GiftListStats = {
  gifteeCount: number;
  minCount: number;
  maxCount: number;
}

export type UserStats = {
  giftListCount: number;
  gifteeCount: number;
}
