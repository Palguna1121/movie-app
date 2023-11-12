import Image from "next/image";
import { Inter } from "next/font/google";
import Landing from "@/components/Landing";
import Collection from "@/components/Collection";
import Category from "@/components/Category";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Landing />
      <Collection />
      <Category />
    </>
  );
}
