import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/features";
import News from "@/components/News";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <Features />
    <News />
    <div style={{width:'100%', height:'300px'}}></div>
    </>
  );
}
