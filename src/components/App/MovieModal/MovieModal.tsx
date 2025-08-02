import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
};

type Props = {
  movie: Movie;
  onClose: () => void;
};

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

export default function MovieModal({ movie, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleScrollBlock = () => {
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('keydown', handleKeyDown);
    handleScrollBlock();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}