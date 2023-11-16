import 'server-only';
import { cache } from 'react';
import { Post } from '../migrations/00004-createTablePosts';
import { sql } from './connect';
import { UserBlogPostWithoutUserId } from './users';

export const getPosts = cache(async () => {
  const posts = await sql<Post[]>`
    SELECT * FROM posts
  `;
  return posts;
});

export const deletePostByUserId = cache(async (userId: number) => {
  const [post] = await sql<Post[]>`
    DELETE FROM
      posts
    WHERE
      user_id = ${userId}
    RETURNING *
  `;

  return post;
});

export const createBlogPost = cache(
  async (userId: number, title: string, content: string, imageUrl: string) => {
    const [posts] = await sql<Post[]>`
      INSERT INTO posts
      (user_id, title, content, image_url)
      VALUES
        (${userId},${title}, ${content}, ${imageUrl})
      RETURNING *
    `;

    return posts;
  },
);

export const getAllBlogPosts = cache(async () => {
  const posts = await sql<UserBlogPostWithoutUserId[]>`
    SELECT
      posts.id AS post_id,
      posts.title AS title,
      posts.content AS content,
      posts.image_url AS image_url,
      users.username AS username

    FROM
      posts
    INNER JOIN
      users ON posts.user_id = users.id
  `;
  return posts;
});

export const getBlogPostsById = cache(async (id: number) => {
  const [post] = await sql<UserBlogPostWithoutUserId>`
    SELECT
      posts.id AS post_id,
      posts.title AS title,
      posts.content AS content,
      users.username AS username
    FROM
      posts
    INNER JOIN
      users ON posts.user_id = users.id
    WHERE
      posts.id = ${id}
  `;
  return post;
});
