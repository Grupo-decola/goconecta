import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Home.css"; 

function Home() {
  return (
    <div>
      <Header />

      <main className="home-main">
        <section className="home-content">
          <h2>Bem-vindo à GoConecta!</h2>
          <p>
            Explore os melhores destinos, passagens e pacotes de viagem com
            facilidade e segurança.
          </p>

        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;