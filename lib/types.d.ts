import { Comment, Post, User } from '@prisma/client';

export interface Blog extends Post {
  author: User;
  category: {
    name: string;
    id: number;
  };
  comments: {
    message: string;
    user: User;
    id: number;
  }[];
}

export interface Comments extends Comment {
  user: User;
  post: Post;
}

export interface UserDash extends User {
  posts: Blog[];
  Comment: Comment[];
}
