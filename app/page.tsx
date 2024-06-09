import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/features";

export default function Home() {
  return (
    <>
    <Header />
    <Hero />
    <Features />
    </>
  );
}
