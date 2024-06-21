'use client';

import { useState, useEffect } from 'react';
import styles from './StatusBar.module.css';

interface StatusBarProps {
    message: string;
    duration?: number;
}

export default function StatusBar({ message, duration = 2000 }: StatusBarProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className={styles.statusBar}>
            <h3>{message}</h3>
        </div>
    );
}
