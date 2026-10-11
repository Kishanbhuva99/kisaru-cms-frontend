
export type User = {
  _id: string,
  username: string,
  email: string,
  phone: string,
  role: 'reader' | 'author' | 'editor' | 'admin',
  avatar: string,
  isActive: boolean,
  createdAt: string,
  updatedAt: string,
};

// export type CreateUser = pick<User, "username" | "email" | "phone" | "password" | "role">

// export type UpdateUser = pick<User, "_id"> & Partial<User>
