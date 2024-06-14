import React from "react";
import styles from "@/app/news/news.module.css";
import Header from "@/components/Header";


export default function NewsArticle() {
    return (
        <div className={styles.container}>
            <Header />
            <p>hello</p>
        </div>
    );
}