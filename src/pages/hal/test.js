import Navbar from "@/components/Navbar";
import Link from "next/link";

const Test = () => {
  return (
    <>
      <Navbar />
      <h1 className="mt-20">halo bro, Test ini</h1>
      <Link href="/">kembali</Link>
    </>
  );
};

export default Test;
