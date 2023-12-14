import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostsById } from '../../../database/posts';
import style from '../[postsId]/page.module.scss';

export async function generateMetadata({ params }) {
  const singleBlogPost = await getBlogPostsById(Number(params.postsId));

  return {
    title: singleBlogPost ? singleBlogPost.BlogPostsById : '',
  };
}

export default async function PostsPage(props) {
  const singleBlogPost = await getBlogPostsById(Number(props.params.postsId));

  console.log('singleBlogPost.BlogPostsById', singleBlogPost.BlogPostsById);
  console.log(singleBlogPost);
  if (!singleBlogPost) {
    return notFound();
  }

  return (
    <div className={style.postWrapper}>
      <div className={style.postContainer}>
        <div>
          <h1>{singleBlogPost.blogPostsById}</h1>
        </div>
        <div>
          <Image
            src={singleBlogPost.imageUrl}
            alt="image"
            width={400}
            height={300}
            className={style.image}
          />
        </div>
        <div className={style.title}>{singleBlogPost.title}</div>
        <div>{singleBlogPost.content}</div>
      </div>
      <div>
        <h2>Add your comment here</h2>
      </div>
      <div id="comment-container">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        id="new-comment"
        cols="60"
        rows="5"
      ></textarea>
      <button onClick={handlePostClick} id="btn-post">
        Post
      </button>
    </div>
  );
}
