import React from 'react';
import styles from "@/components/NewsHat.module.css";
import Image from 'next/image';

interface NewsHatProps {
  imageSrc: string;
  text: string;
  author?: string;
  timeText?: string;
}

const NewsHat: React.FC<NewsHatProps> = ({ imageSrc, text, author, timeText }) => {
  return (
    <div className={styles.container}>
      <img src={imageSrc} alt={text} className={styles.image} />
      <div className={styles.overlay} />
      <div className={styles.textBlock}>
        <h2 className={styles.text}>{text}</h2>
        <div className={styles.about}>
          {author && <p className={styles.author}>{author}</p>}
          <p className={styles.divider}>|</p>
          {timeText && (
            <div className={styles.timeContainer}>
              <Image
                src="/watch.svg"
                alt=""
                className={styles.watch}
                width={20}
                height={20}
                priority
              />
              <p className={styles.timeText}>{timeText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default NewsHat;
