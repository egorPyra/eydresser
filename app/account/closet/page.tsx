'use client'

import Image from "next/image";
import styles from "./closet.module.css";
import Link from "next/link";

export default function Closet() {

  function login(formData: { get: (arg0: string) => any }) {
    const login = formData.get("login");
    localStorage.setItem("login", JSON.stringify(login));
  }

  return (
    <div className={styles.closet}>
      <h1>шкаф</h1>
    </div>
  );
}
