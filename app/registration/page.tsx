'use client';

import Image from "next/image";
import "../login/auth.css";
import "./registration.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import StatusBar from "../../components/StatusBar";

export default function Registration() {
    const [showStatus, setShowStatus] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleRegistration = async (formData: FormData) => {
        const fullName = formData.get("fullName");
        const email = formData.get("email");
        const password = formData.get("password");

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }

            const data = await response.json();

            // Store user data in localStorage or state as needed
            localStorage.setItem("user", JSON.stringify(data.user));

            setStatusMessage('Вы успешно зарегистрировались!');
            setShowStatus(true);

            setTimeout(() => {
                setShowStatus(false);
                router.push('../account');
            }, 3000);

        } catch (error: any) {
            setStatusMessage(error.message);
            setShowStatus(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        handleRegistration(formData);
    };

    return (
        <div className="registrationBody">
            <header>
                <Link href={"/"}>
                    <Image src={'/logo.svg'} width={100} height={60} alt="logo" />
                </Link>
            </header>
            <main>
                <h1>Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fullName" className="authLabel"><h6>Имя</h6></label>
                    <input id="fullName" name="fullName" className="authInput" required />
                    
                    <label htmlFor="email" className="authLabel"><h6>Почта</h6></label>
                    <input id="email" name="email" type="email" className="authInput" required />
                    
                    <label htmlFor="password" className="authLabel"><h6>Пароль</h6></label>
                    <input id="password" name="password" type="password" className="authInput" required />
                    
                    <button type="submit" className="authButton" disabled={isLoading}>
                        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </button>
                </form>
                <Link href={'/login'}><p>Уже есть аккаунт? Войти.</p></Link>
            </main>
            {showStatus && <StatusBar message={statusMessage} />}
        </div>
    );
}
