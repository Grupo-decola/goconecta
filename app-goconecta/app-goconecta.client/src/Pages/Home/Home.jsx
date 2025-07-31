import React from "react";
import { Image } from "@mantine/core";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section id="hero">
        <Image h={300} src="src/assets/img/banner2_web.png" opacity={0.9} />
        <div className="hero-content">
          <div className="hero-text">
            <h2>Descubra lugares incríveis</h2>
            <p>Viaje com conforto, segurança e os melhores preços!</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
