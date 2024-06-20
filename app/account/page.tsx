'use client'

import Image from "next/image";
import "./account.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import Sidebar from "./sidebar/Sidebar";
import Closet from "./closet/page";

export default function Account() {

  function login(formData: { get: (arg0: string) => any }) {
    const login = formData.get("login");
    localStorage.setItem("login", JSON.stringify(login));
    redirect('/')
  }

  return (
    <>
       Главная страница 
    </>
  );
}