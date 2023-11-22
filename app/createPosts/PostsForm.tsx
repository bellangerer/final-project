'use client';

import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../api/(auth)/register/route';
import styles from '../createPosts/create.module.scss';

export default function PostsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/createPosts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content,
        imageUrl: imageUrl,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/posts`);

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
    router.refresh();
  }

  return (
    <div className={styles.titleContainerWrapper}>
      <div className={styles.titleContainer}>
        <form
          onSubmit={async (event) => await handleRegister(event)}
          className={styles.titleWrapper}
        >
          <label className={styles.titleLabel}>
            Title
            <input
              onChange={(event) => setTitle(event.currentTarget.value)}
              className={styles.inputTitleField}
            />
          </label>
          <label className={styles.label}>
            Content
            <input
              onChange={(event) => setContent(event.currentTarget.value)}
              className={styles.inputContentField}
            />
          </label>
          <label className={styles.imageLabel}>
            Image URL
            <input
              onChange={(event) => setImageUrl(event.currentTarget.value)}
              className={styles.imageInputField}
            />
          </label>

          <button className={styles.addPostButton} type="submit">
            Add post
          </button>

          {errors.map((error) => (
            <div className="error" key={`error-${error.message}`}>
              Error: {error.message}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
