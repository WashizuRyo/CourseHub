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
