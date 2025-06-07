'use client';

import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}: ConfirmModalProps) {
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.confirm} onClick={onConfirm}>
            {confirmText}
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
