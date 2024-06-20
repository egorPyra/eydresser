'use client';

import { useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    onClose: () => void;
    onSendCode: (email: string) => void;
    setShowStatusBar: (show: boolean) => void;
    setStatusMessage: (message: string) => void;
}

export default function Modal({ onClose, onSendCode, setShowStatusBar, setStatusMessage }: ModalProps) {
    const [email, setEmail] = useState('');

    const handleSendCode = () => {
        onSendCode(email);
        setStatusMessage('Код был успешно отправлен!');
        setShowStatusBar(true);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Напомнить пароль</h2>
                <p><label htmlFor="email">Введите почту</label></p>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className={styles.input} 
                />
                <button onClick={handleSendCode} className={styles.button}>Отправить код</button>
                <button onClick={onClose} className={styles.button}>Отмена</button>
            </div>
        </div>
    );
}
