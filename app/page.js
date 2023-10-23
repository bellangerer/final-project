import Image from 'next/image';
import styles from '../app/globals.scss';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Your next journey is just one click away.</h1>
        <Image src={'/public/world.jpg'} alt="world" height={200} width={600} />
        <p>
          Welcome to our travel community! We are a passionate group of
          adventurers who share a deep love for exploring the world. Our mission
          is to inspire and connect fellow travelers, providing a space to
          exchange stories, discover new destinations, and offer travel advice.
          Whether you're an experienced globetrotter or just starting your
          journey, there's a place for you here. Join us as we explore the
          beauty and diversity of our planet together.
        </p>
      </div>
    </main>
  );
}
