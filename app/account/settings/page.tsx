'use client'

import React from "react";
import styles from "../closet/closet.module.css";
import "./settings.css";

export default function Liked() {

  return (
    <div>
      <div className={styles.header}>
        <h2>Настройки</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;Егор</h3>
          <img src="/userAvatar.png" className={styles.userAvatar}/>
        </div>
      </div>
      <form>
          <label htmlFor="login" className="authLabel"><h6>Имя</h6></label>
          <input id="login" name="login" className="authInput" defaultValue={"Егор"}/>
          <label htmlFor="login" className="authLabel"><h6>Ник</h6></label>
          <input id="login" name="login" className="authInput" defaultValue={"Egortuss"}/>
          <label htmlFor="login" className="authLabel"><h6>Почта</h6></label>
          <input id="login" name="login" className="authInput" defaultValue={"test@mail.ru"}/>
          <label htmlFor="login" className="authLabel"><h6>Пароль</h6></label>
          <input id="login" type="password" name="login" className="authInput" defaultValue={"qwerty12345"}/>
          <label htmlFor="password" className="authLabel"><h6>Повторите пароль</h6></label>
          <input type="password" id="password" name="password" className="authInput" defaultValue={"qwerty12345"}/>
          <button type="submit" className="authButton">Сохранить</button>
          <button type="submit" className="authButton authButtonDelete">Удалить профиль</button>
      </form>
    </div>
  );
}
