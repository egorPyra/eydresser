'use client'

import React from "react";
import styles from "../closet/closet.module.css";
import "./add.css";
import Image from "next/image";

export default function Closet() {

  return (
    <div>
      <div className={styles.header}>
        <h2>Добавить</h2>
        <div className={styles.hiUser}>
          <h3>Привет,&nbsp;Егор</h3>
          <img src="/userAvatar.png" className={styles.userAvatar}/>
        </div>
      </div>
      <div className="content">
        <div className="greyZone">
        </div>
        <div className="tools">
          <div className="addFromDevice">
            <p>Добавить с компьютера</p>
            <span>jpg, png, heic</span>
          </div>
          <ul className="listClothes">
            <li className="clothesItem">
              <div className="imgWrapper">
                  <Image src={"/add/clothes1.jpg"} layout="fill" objectPosition="contain" alt="item image"/>
              </div>
            </li>
            <li className="clothesItem">
              <div className="imgWrapper">
                  <Image src={"/add/clothes1.jpg"} layout="fill" objectPosition="contain" alt="item image"/>
              </div>
            </li>
            <li className="clothesItem">
              <div className="imgWrapper">
                  <Image src={"/add/clothes1.jpg"} layout="fill" objectPosition="contain" alt="item image"/>
              </div>
            </li>
            <li className="clothesItem">
              <div className="imgWrapper">
                  <Image src={"/add/clothes1.jpg"} layout="fill" objectPosition="contain" alt="item image"/>
              </div>
            </li>
            <li className="clothesItem">
              <div className="imgWrapper">
                  <Image src={"/add/clothes1.jpg"} layout="fill" objectPosition="contain" alt="item image"/>
              </div>
            </li>
            <li className="clothesItem">
              <div className="imgWrapper">
                  <Image src={"/add/clothes1.jpg"} layout="fill" objectPosition="contain" alt="item image"/>
              </div>
            </li>
          </ul>
          <div className="rotate"><h3>Поворот</h3></div>
          <label htmlFor="password" className="authLabel"><h6>Название</h6></label>
          <input id="password" name="password" className="authInput" placeholder="Название"/>
          <button type="submit" className="authButton">Сохранить</button>
        </div>
      </div>
    </div>
  );
}
