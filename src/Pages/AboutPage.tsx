// src/pages/AboutPage.tsx
import  About  from "../components/About/about";
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";

const AboutPage = () => {
  return (
    <div>
      <Navbar />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;