import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Schema, z } from 'zod';
import { createBlogPost } from '../../../database/posts';
import { getValidSessionByToken } from '../../../database/sessions';
import { getUserBySessionToken } from '../../../database/users';
import { Post } from '../../../migrations/00004-createTablePosts';

const blogPostSchema = z.object({
  title: z.string().min(3),
  content: z.string(),
  imageUrl: z.string(),
});

export type BlogPostResponseBodyPost =
  | {
      post: Post;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<BlogPostResponseBodyPost>> {
  const body = await request.json();
  const result = blogPostSchema.safeParse(body);
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
  const user = await getUserBySessionToken(session.token);
  if (!user) {
    return NextResponse.json(
      {
        errors: [{ message: 'User is invalid' }],
      },
      { status: 401 },
    );
  }
  const newBlogPost = await createBlogPost(
    user.id,
    result.data.title,
    result.data.content,
    result.data.imageUrl,
  );

  if (!newBlogPost) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new Post' }] },
      { status: 406 },
    );
  }
  return NextResponse.json({
    post: newBlogPost,
  });
}
