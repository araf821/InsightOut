import { Post, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafePost = Omit<Post, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export type UserWithPosts = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  posts: {
    title: string;
    published: boolean;
  }[];
};

// export type UserWithPost = Omit<User, "createdAt" | "updatedAt"> & {
//   createdAt: string;
//   updatedAt: string;
//   emailVerified: string | null;
// }

// export type SafePostWithCommentCount = Omit<Post, "createdAt" | "updatedAt"> & {
//   createdAt: string;
//   updatedAt: string;
//   author: {
//     id: string;
//     name: string | null;
//     image: string | null;
//   };

// }
