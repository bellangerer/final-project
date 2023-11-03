import 'server-only';
import { cache } from 'react';
import { Comment } from '../migrations/00002-createTableComments';
import { sql } from './connect';

export const createComment = cache(
  async (userId: number, postId: number, comment: string) => {
    const [comments] = await sql<Comment[]>`
      INSERT INTO comments
      (user_id, post_id, comment)
      VALUES
        (${userId}, ${postId},${comment})
      RETURNING *
    `;

    return comments;
  },
);
type CommentWithUsername = {
  commentId: number;
  comment: string;
  postId: number;
  username: string;
};

export const getUserComments = cache(async () => {
  const comments = await sql<CommentWithUsername[]>`
    SELECT
      comments.id AS comment_id,
      comments.comment AS comment,
      comments.post_id AS post_id,
      users.username AS username
    FROM
    comments
    INNER JOIN
      users ON comments.user_id = users.id

  `;
  return comments;
});
