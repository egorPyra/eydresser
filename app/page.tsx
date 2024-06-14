import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/HeaderLogin";
import Hero from "@/components/Hero";
import Features from "@/components/features";
import News from "@/components/News";
import HeaderLogin from "@/components/HeaderLogin";

export default function Home() {
  return (
    <>
    <HeaderLogin />
    <Hero />
    <Features />
    <News />
    <div style={{width:'100%', height:'300px'}}></div>
    </>
  );
}
