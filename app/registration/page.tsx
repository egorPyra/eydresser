'use client'

import Image from "next/image";
import "../login/auth.css";
import "./registration.css";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Registration() {

  function registration(formData: { get: (arg0: string) => any }) {
    const login = formData.get("login");
    localStorage.setItem("login", JSON.stringify(login));
    redirect('/')
  }

  return (
    <body className="registrationBody">
      <header>
        <Link href={"/"}>
            <Image src={'logo.svg'} width={100} height={60} alt="logo"/>
        </Link>
      </header>
      <main>
        <h1>Регистрация</h1>
        <form action={registration}>
          <label htmlFor="login" className="authLabel"><h6>Имя</h6></label>
          <input id="login" name="login" className="authInput"/>
          <label htmlFor="password" className="authLabel"><h6>Почта</h6></label>
          <input id="password" name="password" className="authInput"/>
          <button type="submit" className="authButton">Зарегистрироваться</button>
        </form>
        <Link href={'/login'}>Уже есть аккаунт? Войти.</Link>
      </main>
    </body>
  );
}
