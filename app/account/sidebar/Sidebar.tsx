'use client';

import Image from 'next/image';
import styles from './sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {icon: '/sidebarIcons/main.svg', name: 'главная', link: '/account'},
        {icon: '/sidebarIcons/closet.svg', name: 'шкаф', link: '/account/closet'},
        {icon: '/sidebarIcons/styles.svg', name: 'образы', link: '/account/outfit', status: 'hidden'},
        {icon: '/sidebarIcons/heart.svg', name: 'понравилось', link: '/account/liked'},
        {icon: '/sidebarIcons/settings.svg', name: 'настройки', link: '/account/settings'},
        {icon: '/sidebarIcons/add.svg', name: 'добавить', link: '/account/add'},
        {icon: '/sidebarIcons/exit.svg', name: 'выйти', link: '../login'},
    ];

    const getMenuItemClassName = (link: string, status?: string) => {
        if (status === 'hidden') {
            return styles.hiddenItem;
        }
        return pathname === link ? styles.activeItem : styles.item;
    };

    return (
        <div className={styles.sidebar}>
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
    );
}
