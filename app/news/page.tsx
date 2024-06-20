'use client'

import Link from 'next/link';
import styles from '@/app/news/page.module.css';
import Header from '@/components/Header';
import Image from "next/image";
import { useRouter } from 'next/navigation';


const NewsPage = () => {
    return (
        <div className={styles.container}>
            <Link href="/"><Header /></Link>
            <h5 className={styles.title}><span style={{ color: 'rgb(var(--accent-color-rgb))' }}>ey|</span>взгляд</h5>
            <h1 className={styles.sensation}>Свежие выпуски: прямо из редакции</h1>
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
                                <p>7-13 минут</p>
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
            <div className={styles.box}>
                <Link href="/news/p3" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/covers/p3.webp"
                            alt=""
                            className={styles.imageCard}
                            width={660}
                            height={250}
                            priority
                        />
                        <div className={styles.category}>
                            <h3>Здоровье</h3>
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
                                <p>20-25 минут</p>
                                <span style={{ margin: '0 20px' }}>|</span>
                                <Image
                                    src="/avatar.svg"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>Юлия Самошкина</p>

                            </div>
                            <h3>10 проверенных средств для губ</h3>
                            <p>Когда заходит речь о макияже губ, тема давно не сводится лишь к выбору цвета помады или блеска. Продвинутые бьюти-энтузиасты смотрят шире и ждут от средств этой категории более широкого функционала: лифтинга, способности увеличивать объем, подобно бьюти-инъекциям гиалуронки, моделировать контур или даже просто крашать полку необычной коллекционной упаковкой. </p>
                        </div>
                    </div>
                </Link>
                <Link href="/news/p4" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/covers/p4.png.webp"
                            alt=""
                            className={styles.imageCard}
                            width={660}
                            height={250}
                            priority
                        />
                        <div className={styles.category}>
                            <h3>Мода</h3>
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
                                <p>Антон Бандераз</p>

                            </div>
                            <h3>Маст-хэв в летнем гардеробе для мужчин 2024</h3>
                            <p>Одеваться в самые жаркие месяцы года не самое приятное занятие (и уж точно не самое сухое). Но если вы правильно подберете мужскую летнюю одежду, то сможете переносить зной с высокомерием и уверенностью трехлетнего ребенка, впервые попробовавшего халапеньо.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <h1 className={styles.categoryTitle}><span style={{ color: 'rgb(var(--accent-color-rgb))' }}>|</span>показы</h1>

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
                <Link href="/news/p5" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/covers/p5.jpg"
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
                                <p>20-25 минут</p>
                                <span style={{ margin: '0 20px' }}>|</span>
                                <Image
                                    src="/avatar.svg"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>Эдуард Юсупов</p>

                            </div>
                            <h3><b>Каким будет Met Gala в 2024 году:</b> все, что нужно знать о бале</h3>
                            <p>Met Gala — одно из самых громких событий в мире моды. Это благотворительный бал, который посещают мировые звезды и именитые дизайнеры. <i style={{ opacity: '0' }}> Главная особенность мероприятия — ежегодно меняющийся дресс-код, которому должны соответствовать наряды всех гостей. Самая насыщенная и самая богатая на именитые бренды неделя моды — парижская. Она поставила жирную точку и подтвердила все тренды, которые мы обозначили до неё. rhfdbdnfurbksbrbdddd</i></p>
                        </div>
                    </div>
                </Link>
                <Link href="/" className={styles.link} style={{ visibility: 'hidden' }}>
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
                                    src="/avatar.svg"
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

            <h1 className={styles.categoryTitle}><span style={{ color: 'rgb(var(--accent-color-rgb))' }}>|</span>лайфхаки</h1>

            <div className={styles.box}>
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
                                <p>7-13 минут</p>
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
                <Link href="/news/p6" className={styles.link}>
                    <div className={styles.card}>
                        <Image
                            src="/covers/p6.jpg"
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
                                <p>5-10 минут</p>
                                <span style={{ margin: '0 20px' }}>|</span>
                                <Image
                                    src="/avatar.svg"
                                    alt=""
                                    className={styles.watch}
                                    width={20}
                                    height={20}
                                    priority
                                />
                                <p>Омри Гиллат</p>

                            </div>
                            <h3>12 лайфхаков по уходу за обувью</h3>
                            <p>Обувь может рассказать о своем владельце до 90 % информации — к такому выводу пришел исследователь Омри Гиллат. Например, неновая, но ухоженная обувь говорит об ответственности и порядочности. Вспыльчивые люди предпочитают узкие полусапожки. В общем, человека часто оценивают по его обуви, поэтому ее необходимо держать в порядке.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default NewsPage;
