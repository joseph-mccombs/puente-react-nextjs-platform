import Card from 'app/components/molecules/card';

import styles from './index.module.scss';

const movies = [
  '/breaking-bad.webp',
  '/the-leftovers.jpg',
  '/game-of-thrones.jpg',
  '/true-detective.jpg',
  '/walking-dead.jpg',
  '/breaking-bad.webp',
  '/the-leftovers.jpg',
  '/game-of-thrones.jpg',
  '/true-detective.jpg',
  '/walking-dead.jpg',
];

const Carousel = () => (
  <div className={styles.carousel}>
    <div className={styles.container}>
      {movies.map((src) => (
        <Card
          title="src"
          description={src}
        />

      ))}
    </div>
  </div>
);

export default Carousel;
