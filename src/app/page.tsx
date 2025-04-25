import Banner from "@/components/components/Banner";
import Header from "@/components/components/Header";
import SpecialityMenu from "@/components/components/SpecialityMenu";
import TopDoctors from "@/components/components/TopDoctors";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </main>
  );
};

export default Home;
