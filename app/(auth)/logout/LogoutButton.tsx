import React from 'react';
import styles from '../logout/logout.module.scss';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button className={styles.logoutButton} formAction={logout}>
        Logout{' '}
      </button>
    </form>
  );
}
