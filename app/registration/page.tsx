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
    const router = useRouter();

    const handleRegistration = (formData: FormData) => {
        const login = formData.get("login");
        localStorage.setItem("login", JSON.stringify(login));
        setStatusMessage('Вы успешно зарегистрировались!');
        setShowStatus(true);

        setTimeout(() => {
            setShowStatus(false);
            router.push('../account');
        }, 3000);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        handleRegistration(formData);
    };

    return (
        <body className="registrationBody">
            <header>
                <Link href={"/"}>
                    <Image src={'logo.svg'} width={100} height={60} alt="logo"/>
                </Link>
            </header>
            <main>
                <h1>Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="login" className="authLabel"><h6>Имя</h6></label>
                    <input id="login" name="login" className="authInput"  />
                    <label htmlFor="password" className="authLabel"><h6>Почта</h6></label>
                    <input id="password" name="password" className="authInput"  />
                    <button type="submit" className="authButton">Зарегистрироваться</button>
                </form>
                <Link href={'/login'}><p>Уже есть аккаунт? Войти.</p></Link>
            </main>
            {showStatus && <StatusBar message={statusMessage} />}
        </body>
    );
}
