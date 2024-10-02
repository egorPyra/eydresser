'use client';

import { useState } from 'react';
import Image from "next/image";
import "./auth.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import StatusBar from "@/components/StatusBar";

export default function Login() {
    const [showModal, setShowModal] = useState(false);
    const [showStatusBar, setShowStatusBar] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function login(formData: { get: (arg0: string) => any }) {
        const email = formData.get("login");
        const password = formData.get("password");
    
        try {
            setIsLoading(true);
            
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Something went wrong');
            }
    
            const data = await res.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('../account');
        } catch (error: any) {
            console.error('Login failed:', error);
            setStatusMessage(error.message || 'Login failed');
            setShowStatusBar(true);
        } finally {
            setIsLoading(false);
        }
    }
    


    const handleSendCode = (email: string) => {
        // Send code to the email (you can implement the actual email sending logic here)
        console.log(`Send code to ${email}`);
    };

    return (
        <div className="loginBody">
            <header>
                <Link href={"/"}>
                    <Image src={'/logo.svg'} width={100} height={60} alt="logo" />
                </Link>
            </header>
            <main className='main'>
                <h1>Вход</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    login(formData);
                }}>
                    <label htmlFor="login" className="authLabel"><h6>Логин</h6></label>
                    <input id="login" name="login" className="authInput" required />
                    <label htmlFor="password" className="authLabel">
                        <h6>Пароль</h6>
                        <span className="forgotPassword" onClick={() => setShowModal(true)}>Забыли пароль?</span>
                    </label>
                    <input type="password" id="password" name="password" className="authInput" required />
                    <button type="submit" className="authButton" disabled={isLoading}>
                        {isLoading ? 'Вход...' : 'Войти'}
                    </button>
                </form>
                <Link href={'/registration'}><p>Впервые? Создать аккаунт</p></Link>
            </main>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    onSendCode={handleSendCode}
                    setShowStatusBar={setShowStatusBar}
                    setStatusMessage={setStatusMessage}
                />
            )}
            {showStatusBar && <StatusBar message={statusMessage} />}
        </div>
    );
}
