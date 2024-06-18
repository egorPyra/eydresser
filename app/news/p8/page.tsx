'use client'

import React from "react";
import styles from "@/app/news/news.module.css";
import NewsHat from "@/components/NewsHat";
import Image from "next/image";
import Link from "next/link";
import HeaderBack from "@/components/HeaderBack";


export default function NewsArticle() {
    return (
        <div className={styles.container}>
            <HeaderBack />
            <NewsHat
                imageSrc="/covers/p1.jpg"
                text="Неделя моды в Париже 2024"
                author="Steeve Jobs"
                timeText="12 - 15 минут"
            />

            <div className={styles.mainBox}>
                <p>Самая насыщенная и&nbsp;самая богатая на&nbsp;именитые бренды неделя моды&nbsp;&mdash; парижская. Она поставила жирную точку и&nbsp;подтвердила все тренды, которые мы&nbsp;обозначили до&nbsp;неё.</p>
                <p>Мы&nbsp;полюбим бахрому, начнём присматриваться ко&nbsp;всевозможным трусам и&nbsp;купим парочку прозрачных вещей. Дословно повторять необязательно, но&nbsp;направление мысли уже ясно.</p>
                <p>Кстати, парижская неделя сопровождалась парочкой прощальных эмоциональных коллекций. Ну&nbsp;обо всем по&nbsp;порядку.</p>

                <h3>CHRISTIAN DIOR</h3>
                <p>Мода, феминистская повестка и&nbsp;лозунги вместо декораций. Мария Грация Кьюри в&nbsp;своём репертуаре, как и&nbsp;коллекция от&nbsp;роскошного модного дома. Классические силуэты, минимум экспериментов в&nbsp;стилизации, жакеты, платья и&nbsp;белые рубашки.</p>
                <p>Кстати, по&mdash;моему, дизайнер вдохновилась нашим видео &laquo;Как носить рубашку стильно&raquo; и&nbsp;выпустила свою асимметричную версию.</p>

                <h3>SAINT LAURENT</h3>
                <p>Роскошный и&nbsp;сексуальный сафари. Комбинезоны, платья, пальто, пропитанные настроением 80&mdash;х. Именно тогда легендарный Ив&nbsp;Сен&mdash;Лоран открыл модному миру стиль сафари.</p>
                <p>Обращаем внимание, как круто здесь смотрятся монохромные комплекты и&nbsp;крупные украшения.</p>

                <img src="/covers/p1i1.png" />

                <h3>THE ROW</h3>
                <p>Характерная для бренда спокойная коллекция в&nbsp;стиле минимализм. Классические и&nbsp;очень понятные платья, костюмы и&nbsp;топы&nbsp;&mdash; с&nbsp;одной стороны. И&nbsp;игры с&nbsp;объёмами и&nbsp;пропорциями&nbsp;&mdash; с&nbsp;другой.</p>
                <p>Берите на&nbsp;заметку, что браслет можно носить и&nbsp;в&nbsp;районе локтевого сгиба.</p>

                <img src="/covers/p1i2.png" />

                <h3>DRIES VAN NOTEN</h3>
                <p>Интересный взгляд на&nbsp;повседневный женский гардероб. Бра под тренчем заменяет блузку, юбка карго на&nbsp;запах вместо офисных брюк.</p>
                <p>Ну&nbsp;и&nbsp;принтованные носочки вместе с&nbsp;остроносыми туфлями. Без носков следующей весной никуда.</p>

                <img src="/covers/p1i3.png" />

                <h3>MAISON MARGIELA</h3>
                <p>Идеальное комбо ДНК бренда и&nbsp;почерка его креативного директора Джона Гальяно. Острые воротнички, сложные конструкции и&nbsp;аксессуары&nbsp;&mdash; явно рука мастера.</p>
                <p>Раздвоенный мыс на&nbsp;обуви, объём и&nbsp;белые стежки на&nbsp;чёрном пальто&nbsp;&mdash; отсылки к&nbsp;наследию модного дома.</p>

                <img src="/covers/p1i4.png" />

                <span className={styles.src}>Источник: <a href="https://www.shoppingschool.ru/articles/nedelya-mody-v-parizhe-ss-2024-trendy-i-stritstayl.html?ysclid=lxhjz867hy343086508">shoppingschool.ru</a></span>

            </div>

            <h2 className={styles.next}>Читать далее</h2>
            <div className={styles.box}>
                <Link href="/news/p1" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/sample1.jpg"
                            alt=""
                            className={styles.imageCard}
                            width={660}
                            height={250}
                            priority
                        />
                        <div className={styles.category}>
                            <h3>Показы</h3>
                        </div>

                        <div className={styles.cardText}>
                            <div className={styles.meta}>
                                <Image
                                    src="/watch.svg"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>15-20 минут</p>
                                <span style={{ margin: '0 20px' }}>|</span>
                                <Image
                                    src="/Blank-Avatar.png"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>Antonio Banderas</p>

                            </div>
                            <h3>Неделя моды в Париже 2024</h3>
                            <p>Самая насыщенная и самая богатая на именитые бренды неделя моды — парижская. Она поставила жирную точку и подтвердила все тренды, которые мы обозначили до неё. Мы полюбим бахрому, начнём присматриваться ко всевозможным трусам и купим парочку прозрачных вещей. Дословно повторять необязательно, но направление мысли уже ясно. Кстати, парижская неделя сопровождалась парочкой прощальных эмоциональных коллекций. Ну обо всем по порядку.</p>
                        </div>
                    </div>
                </Link>
                <Link href="/" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/sunglasses.png"
                            alt=""
                            className={styles.imageCard}
                            width={660}
                            height={250}
                            priority
                        />
                        <div className={styles.category}>
                            <h3>Лайфхаки</h3>
                        </div>

                        <div className={styles.cardText}>
                            <div className={styles.meta}>
                                <Image
                                    src="/watch.svg"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>15-20 минут</p>
                                <span style={{ margin: '0 20px' }}>|</span>
                                <Image
                                    src="/Blank-Avatar.png"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>Antonio Banderas</p>

                            </div>
                            <h3>Гайд по выбору очков на лето</h3>
                            <p>Очки состоят из двух принципиальных частей: линз и оправы. Линзы преломляют свет от внешнего мира, чтобы в него было не так больно смотреть. Оправа держит линзы недалеко от глаз, потому что держать линзы руками неудобно. Очки состоят из двух принципиальных частей: линз и оправы. Линзы преломляют свет от внешнего мира, чтобы в него было не так больно смотреть. Оправа держит линзы недалеко от глаз, потому что держать линзы руками неудобно.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div style={{width:'100%', height:'300px'}}></div>

        </div>
    );
}