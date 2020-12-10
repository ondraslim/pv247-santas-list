


export type Gift = {
  id: string;
  name: string;
  price: number;
  url: string;
};

export type Giftee = {
  id: string;
  name: string;
  note: string;
  budget: number;
  gifts: Gift[];
}

export type GiftList = {
  id: string;
  name: string;
  user: string;
  recipients: Giftee[];   // TODO: rename to giftees
}

export type GiftListStats = {
  gifteeCount: number;
  minCount: number;
  minName: string;
  maxCount: number;
  maxName: string;
  avgCount: number;
}

export type UserStats = {
  giftListCount: number;
  gifteeCount: number;
}
