import { Category, User } from '@prisma/client';
import axios from 'axios';
import { Fetcher } from 'swr';
import { Blog, UserDash } from './types';

export const fetcher: Fetcher<Blog[], string> = (url) =>
  axios.get(url).then((res) => res.data);

export const fetcherPost: Fetcher<Blog, string> = (url) =>
  axios.get(url).then((res) => res.data);

export const fetcherCategory: Fetcher<Category[], string> = (url) =>
  axios.get(url).then((res) => res.data);

export const fetcherUser: Fetcher<UserDash, string> = (url) =>
  axios.get(url).then((res) => res.data);
export const fetcherUserAdmin: Fetcher<User[], string> = (url) =>
  axios.get(url).then((res) => res.data);
