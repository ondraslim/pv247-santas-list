


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
  recipients: Giftee[];
  gifts?: Gift[];
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
