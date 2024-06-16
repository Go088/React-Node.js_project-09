import sprite from '../../../assets/sprite.svg';
import styles from './Close.module.css';

export const EyeClose = () => {
  return (
    <>
      <svg className={styles.svg}>
        <use href={`${sprite}#icon-x-close`} />
      </svg>
    </>
  );
};