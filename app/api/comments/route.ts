import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createComment } from '../../../database/comment';
import { getValidSessionByToken } from '../../../database/sessions';
import { Comment } from '../../../migrations/00003-createTableComments';

const commentSchema = z.object({
  userId: z.number(),
  postId: z.number(),
  comment: z.string().min(1),
});

export type CommentResponseBodyPost =
  | {
      comment: Comment;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentResponseBodyPost>> {
  const body = await request.json();
  const result = commentSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }
  // 1. get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the token has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }

  const newComment = await createComment(
    result.data.userId,
    result.data.postId,
    result.data.comment,
  );

  if (!newComment) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new Post' }] },
      { status: 406 },
    );
  }
  return NextResponse.json({
    comment: newComment,
  });
}
