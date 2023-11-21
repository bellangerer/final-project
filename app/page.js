import Image from 'next/image';
import Link from 'next/link';
import styles from '../app/globals.scss';

export default function Home() {
  return (
    <main>
      <div>
        <h2>Your next journey is just one click away.</h2>
        <div>
          <div className={styles.image}>
            <div className="imageWrapper">
              <Image
                src={'/images/travel.jpg'}
                alt="world"
                height={500}
                width={900}
                class="image"
              />
            </div>
          </div>
          <div className="aboutText">
            <p>
              Welcome to our travel community! We are a passionate group of
              adventurers who share a deep love for exploring the world. Our
              mission is to inspire and connect fellow travelers, providing a
              space to exchange stories, discover new destinations, and offer
              travel advice. Whether you're an experienced globetrotter or just
              starting your journey, there's a place for you here. Join us as we
              explore the beauty and diversity of our planet together.
            </p>
            <div className={styles.blogButton}>
              <div className="blogButton">
                <Link href="/posts">click for more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
