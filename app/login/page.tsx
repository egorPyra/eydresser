'use client'

import Image from "next/image";
import "./auth.css";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {

  function login(formData: { get: (arg0: string) => any }) {
    const login = formData.get("login");
    localStorage.setItem("login", JSON.stringify(login));
    redirect('/')
  }

  return (
    <body className="loginBody">
      <header>
        <Link href={"/"}>
          <Image src={'logo.svg'} width={100} height={60} alt="logo"/>
        </Link>      
      </header>
      <main>
        <h1>Вход</h1>
        <form action={login}>
          <label htmlFor="login" className="authLabel"><h6>Логин</h6></label>
          <input id="login" name="login" className="authInput"/>
          <label htmlFor="password" className="authLabel">
            <h6>Пароль</h6>
            <Link href="/registration" className="forgotPassword">Забыли пароль?</Link>
          </label>
          <input id="password" name="password" className="authInput"/>
          <button type="submit" className="authButton">Войти</button>
        </form>
        <Link href={'registration'}>Впервые? Создать аккаунт.</Link>
      </main>
    </body>
  );
}
