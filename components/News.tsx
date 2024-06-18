import React from "react";
import styles from "@/components/News.module.css"
import Image from "next/image";
import Link from "next/link";

export default function News() {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}><span style={{ color: 'rgb(var(--accent-color-rgb))' }}>ey|</span>взгляд</h1>

            <div className={styles.box}>
                <Link href="/news/p1" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/covers/p1.jpg"
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
                <Link href="/news/p2" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/covers/p2.png"
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
            <Link href="/news" className={styles.allNewsButton}>
            <div className={styles.allNewsButton}>
                <h6>Все новости</h6>
            </div>
            </Link>
        </div>
    );
}