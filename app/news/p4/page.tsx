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
                imageSrc="/covers/p4.png.webp"
                text="Маст-хэв в летнем гардеробе для мужчин 2024"
                author="Антон Бандераз"
                timeText="15 - 20 минут"
            />

            <div className={styles.mainBox}>

                <p>Одеваться в&nbsp;самые жаркие месяцы года не&nbsp;самое приятное занятие (и&nbsp;уж&nbsp;точно не&nbsp;самое сухое). Но&nbsp;если вы&nbsp;правильно подберете мужскую летнюю одежду, то&nbsp;сможете переносить зной с&nbsp;высокомерием и&nbsp;уверенностью трехлетнего ребенка, впервые попробовавшего халапеньо.</p>
                <p>Легко поверить, что лето&nbsp;&mdash; худшее время года для одежды, и&nbsp;в&nbsp;этом есть доля правды. Помимо того, что вы&nbsp;постоянно чувствуете себя липкой и&nbsp;вульгарной, выглядеть стильно, надевая меньше одежды,&nbsp;&mdash; непростая задача. Не&nbsp;волнуйтесь, потому что мы&nbsp;тщательно изучили наши крайне проблемные привычки к&nbsp;покупкам и&nbsp;составили окончательный список необходимых вещей, которые помогут вам оставаться бодрыми, как огурчик.</p>
                <p>От&nbsp;ярких плавок и&nbsp;ароматного одеколона до&nbsp;стильных платьев на&nbsp;пуговицах и&nbsp;солнцезащитных очков&nbsp;&mdash; у&nbsp;нас есть все самое лучшее для вас. Так что, независимо от&nbsp;того, запланирован&nbsp;ли у&nbsp;вас отпуск или вы&nbsp;забронировали столик в&nbsp;редком ресторане, представленные ниже предметы мужской летней одежды станут для вас началом самого жаркого сезона.</p>

                <h3>Базовая белая футболка</h3>
                <p>Белая футболка&nbsp;&mdash; это неотъемлемая часть любого мужского гардероба. Она универсальна, подходит ко&nbsp;всему и&nbsp;придает свежий вид. Этот набор от&nbsp;Lady White&nbsp;Co. предлагает высокое качество и&nbsp;комфорт, что делает его идеальным выбором для повседневного ношения.</p>
                <p><a className={styles.clothesLink} href="https://ladywhiteco.com/products/our-t-shirt-off-white">Перейти на сайт</a></p>
                <img src="/covers/p4i1.png" />

                <h3>Солнцезащитный крем</h3>
                <p>Защита кожи от&nbsp;солнечных лучей&nbsp;&mdash; это основа заботы о&nbsp;своем здоровье и&nbsp;внешнем виде. Supergoop! Unseen Sunscreen обеспечивает надежную защиту SPF40, не&nbsp;оставляя белых следов и&nbsp;жирного блеска. Идеальный выбор для активного лета.</p>
                <p><a className={styles.clothesLink} href="https://supergoop.com/products/unseen-sunscreen?variant=31189107376226">Перейти на сайт</a></p>
                <img src="/covers/p4i2.png" />

                <h3>Плавки</h3>
                <p>Плавки, которые можно использовать не&nbsp;только для плавания, но&nbsp;и&nbsp;как шорты&nbsp;&mdash; идеальный выбор для лета. Эти плавки от&nbsp;Bather обладают стильным дизайном и&nbsp;обеспечивают комфорт, будь&nbsp;то на&nbsp;пляже или в&nbsp;городской среде.</p>
                <p><a className={styles.clothesLink} href="https://bather.com/collections/swim">Перейти на сайт</a></p>
                <img src="/covers/p4i3.png" />

                <h3>Летние кеды</h3>
                <p>Эти кеды&nbsp;&mdash; отличный вариант для тех, кто ценит стиль и&nbsp;удобство. Легкие и&nbsp;дышащие, они идеально подойдут для прогулок по&nbsp;городу или отдыха на&nbsp;природе.</p>
                <p><a className={styles.clothesLink} href="https://www.buckmason.com/products/seeded-natural-herringbone-moonstar-deck-shoe">Перейти на сайт</a></p>
                <img src="/covers/p4i4.png" />

                <h3>Стильные солнцезащитные очки</h3>
                <p>Солнцезащитные очки не&nbsp;только защищают глаза от&nbsp;вредного ультрафиолета, но&nbsp;и&nbsp;являются важным аксессуаром для создания стильного образа. Модель Lattrell от&nbsp;Warby Parker станет отличным дополнением к&nbsp;вашему летнему гардеробу.</p>
                <p><a className={styles.clothesLink} href="https://www.warbyparker.com/sunglasses/latrell/jet-black?w=medium">Перейти на сайт</a></p>
                <img src="/covers/p4i5.png" />

                <h3>Рыбацкие сандалии</h3>
                <p>Эти сандалии сочетают в&nbsp;себе комфорт и&nbsp;стиль. Они отлично подойдут для жарких дней, позволяя ногам дышать и&nbsp;обеспечивая максимальный комфорт при ходьбе.</p>
                <p><a className={styles.clothesLink} href="https://vinnysthevibe.com/products/fisherman-sandal-1">Перейти на сайт</a></p>
                <img src="/covers/p4i6.png" />

                <h3>Майка</h3>
                <p>Эта майка идеально подчеркивает фигуру и&nbsp;подходит для жарких дней. Высокий ворот и&nbsp;ребристая ткань добавляют стильности, делая ее&nbsp;незаменимой частью летнего гардероба.</p>
                <p><a className={styles.clothesLink} href="https://www.abercrombie.com/shop/wd/p/essential-ribbed-high-neck-tank-57173819">Перейти на сайт</a></p>
                <img src="/covers/p4i7.png" />




                {/* <span className={styles.src}>Источник: <a href="https://www.shoppingschool.ru/articles/nedelya-mody-v-parizhe-ss-2024-trendy-i-stritstayl.html?ysclid=lxhjz867hy343086508">shoppingschool.ru</a></span> */}

            </div>

            <h2 className={styles.next}>Читать далее</h2>
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
                                    src="/avatar.svg"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>Татьяна Тимофеева</p>

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
                                    src="/avatar.svg"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>Ирина Лобанова</p>

                            </div>
                            <h3>Гайд по выбору очков на лето</h3>
                            <p>Очки состоят из двух принципиальных частей: линз и оправы. Линзы преломляют свет от внешнего мира, чтобы в него было не так больно смотреть. Оправа держит линзы недалеко от глаз, потому что держать линзы руками неудобно. Очки состоят из двух принципиальных частей: линз и оправы. Линзы преломляют свет от внешнего мира, чтобы в него было не так больно смотреть. Оправа держит линзы недалеко от глаз, потому что держать линзы руками неудобно.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div style={{ width: '100%', height: '300px' }}></div>

        </div>
    );
}