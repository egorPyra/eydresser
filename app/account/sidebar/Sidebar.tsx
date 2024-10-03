'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        {icon: '/sidebarIcons/main.svg', name: 'главная', link: '/account'},
        {icon: '/sidebarIcons/closet.svg', name: 'шкаф', link: '/account/closet'},
        {icon: '/sidebarIcons/styles.svg', name: 'образы', link: '/account/outfit' },
        {icon: '/sidebarIcons/heart.svg', name: 'понравилось', link: '/account/liked', status: 'hidden'},
        {icon: '/sidebarIcons/settings.svg', name: 'настройки', link: '/account/settings'},
        {icon: '/sidebarIcons/add.svg', name: 'создать образ', link: '/account/newOutfit'},

        {icon: '/sidebarIcons/exit.svg', name: 'выйти', link: '../login'},
    ];

    const getMenuItemClassName = (link: string | null, status: string | undefined) => {
        if (status === 'hidden') {
            return styles.hiddenItem;
        }
        return pathname === link ? styles.activeItem : styles.item;
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className={styles.menuButton} onClick={toggleMenu}>Меню</button>

            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <Link href={"/"}>
                    <Image src={'/logo.svg'} width={100} height={60} alt="logo" priority/>
                </Link>

                <ul className={styles.list}>
                    {menuItems.map(item => (
                        <li className={getMenuItemClassName(item.link, item.status)} key={item.link}>
                            {item.status === 'hidden' ? (
                                <Link href={'/'}>
                                    <Image src={item.icon} width={20} height={20} alt="icon"/>
                                    <h3>{item.name}</h3>
                                </Link>
                            ) : (
                                <Link href={item.link}>
                                    <Image src={item.icon} width={20} height={20} alt="icon"/>
                                    <h3>{item.name}</h3>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
