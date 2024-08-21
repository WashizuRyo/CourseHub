export type UserType = {
  username: string;
  image: string;
};

export type ReviewType = {
  id: number;
  date: string;
  title: string;
  star: number;
  createdBy: string;
  className: string;
  isAnonymous: boolean;
  evaluation: string;
  universityId: number;
  user: UserType;
};

export type ReviewsType = ReviewType[];

export type University = {
  universityId: number;
  universityname: string;
  date: string;
} | null;
