import React from 'react';
import Products from './Products';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

    React.useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
        });
      }, []);

    return (
        <div className="hero" data-aos="fade-right">
            <div className="card bg-dark text-white border-0">
                <img src="assets/bghome.jpg" className="card-img" alt="Background" height="700px"/>
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className="container">
                    <h5 className="card-title display-3 fw-bolder mb-0">SHOP FINITY</h5>
                    </div>
                </div>
            </div>
            <Products/>
        </div>
    )
}

export default Home;