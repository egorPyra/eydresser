'use client'

import Image from "next/image";
import styles from "./sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
    const menuItems = [
        {icon: '/sidebarIcons/main.svg', name: 'главная', link: '/account'},
        {icon: '/sidebarIcons/closet.svg', name: 'шкаф', link: '/account/closet'},
        {icon: '/sidebarIcons/styles.svg', name: 'образы', link: '/account/styles'},
        {icon: '/sidebarIcons/heart.svg', name: 'понравилось', link: '/account/liked'},
        {icon: '/sidebarIcons/settings.svg', name: 'настройки', link: '/account/settings'},
        {icon: '/sidebarIcons/add.svg', name: 'добавить', link: '/account/add'},
        {icon: '/sidebarIcons/exit.svg', name: 'выйти', link: '/'},
    ]


    return (
        <div className={styles.sidebar}>
            <Link href={"/"}>
                <Image src={'logo.svg'} width={100} height={60} alt="logo"/>
            </Link>

            <ul className={styles.list}>
                {menuItems.map(item => {
                    return (
                        <li className="item">
                            <Link href={item.link}>
                                <Image src={item.icon} width={20} height={20} alt="icon"/>
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}
