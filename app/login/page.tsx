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
    const router = useRouter();

    function login(formData: { get: (arg0: string) => any }) {
        const login = formData.get("login");
        localStorage.setItem("login", JSON.stringify(login));
        router.push('../account');
    }

    const handleSendCode = (email: string) => {
        // Send code to the email (you can implement the actual email sending logic here)
        console.log(`Send code to ${email}`);
    };

    return (
        <body className="loginBody">
            <header>
                <Link href={"/"}>
                    <Image src={'logo.svg'} width={100} height={60} alt="logo"/>
                </Link>
            </header>
            <main>
                <h1>Вход</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    login(formData);
                }}>
                    <label htmlFor="login" className="authLabel"><h6>Логин</h6></label>
                    <input id="login" name="login" className="authInput"/>
                    <label htmlFor="password" className="authLabel">
                        <h6>Пароль</h6>
                        <span className="forgotPassword" onClick={() => setShowModal(true)}>Забыли пароль?</span>
                    </label>
                    <input type="password" id="password" name="password" className="authInput"/>
                    <button type="submit" className="authButton">Войти</button>
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
        </body>
    );
}
