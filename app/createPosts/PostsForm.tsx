'use client';

import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../api/(auth)/register/route';

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
    <form onSubmit={async (event) => await handleRegister(event)}>
      <label>
        Title
        <input onChange={(event) => setTitle(event.currentTarget.value)} />
      </label>
      <label>
        Content
        <input onChange={(event) => setContent(event.currentTarget.value)} />
      </label>
      <label>
        Image URL
        <input onChange={(event) => setImageUrl(event.currentTarget.value)} />
      </label>
      <CldImage
        width="960"
        height="600"
        src="<Public ID>"
        sizes="100vw"
        alt="Description of my image"
      />

      <button type="submit">Add post</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}
    </form>
  );
}
