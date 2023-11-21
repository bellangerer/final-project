'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from '../register/register.module.scss';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.username}`);

    // revalidatePath() throws unnecessary error, will be used when stable
    // revalidatePath('/(auth)/login', 'page');
    router.refresh();
  }

  return (
    <div className={styles.registerContainerWrapper}>
      <div className={styles.registerContainer}>
        <form
          onSubmit={async (event) => await handleRegister(event)}
          className={styles.registerFormWrapper}
        >
          <label className={styles.label}>
            Username
            <input
              className={styles.inputUserField}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              className={styles.inputPasswordField}
              type="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
          </label>
          <button className="registerButton">Register</button>

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
