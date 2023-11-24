import Image from 'next/image';
import styles from '../profile.module.scss';
import { ProfileButton } from './ProfileButton';

type Props = {
  params: { username: string };
};

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <h2>Welcome back {params.username} </h2>
      <div className={styles.passportImage}>
        <div className="imageWrapper">
          <Image
            src="/images/passport.jpg"
            alt="passport"
            width={900}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
