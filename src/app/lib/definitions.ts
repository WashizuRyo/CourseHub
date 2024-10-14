export type Review = {
  faculty: string;
  id: number;
  date: string;
  title: string;
  star: number;
  createdBy: string;
  className: string;
  isAnonymous: boolean;
  evaluation: string;
  universityId: number;
  user: User;
  likes?: Likes[];
  isLiked?: boolean;
};

export type Likes = {
  id: number;
  reviewId: number;
  userId: string;
};

export type User = {
  name: string | null;
  image: string | null;
};

export type University = {
  universityId: number;
  universityname: string;
  date: string;
} | null;

export type searchParmas = {
  classname?: string;
  page?: string;
  sort?: 'asc' | 'desc';
  faculty?: string;
};
