import React from "react";
import './Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {

    return (
        <>
        <Navbar />
        <main className="main">
        <div className="container">
          <h2>Welcome to Answerly!</h2>
          <p>Ask questions, get answers, and engage with the community.</p>
          <br/>
          <a href="/question" className="cta-btn">Get Started</a>
        </div>
      </main>
      <Footer />
    </>
    )
}

export default Home;