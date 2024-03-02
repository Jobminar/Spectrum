import aries from "../../../assets/zodiacstones/Aries.png";
import cancer from "../../../assets/zodiacstones/cancer.png";
import aquarius from "../../../assets/zodiacstones/Aquarius.png";
import capricornstones from "../../../assets/zodiacstones/capricorn.png";
import geministones from "../../../assets/zodiacstones/gemini.png";
import leostones from "../../../assets/zodiacstones/leo.png";
import librastones from "../../../assets/zodiacstones/libra.png";
import piecesstones from "../../../assets/zodiacstones/pisches.png";
import scorpiostones from "../../../assets/zodiacstones/scorpio.png";
import taurusstones from "../../../assets/zodiacstones/taurus.png";
import virgostones from "../../../assets/zodiacstones/virgo.png";

import { useNavigate } from "react-router-dom";
// import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./zodiaccarousel.css";
// import { useEffect } from 'react'

const MyCarousel = () => {
  const navigate = useNavigate();

  const navigateToSubPage = (itemName) => {
    navigate("/zodiacsub", { state: { itemName } });
    console.log(itemName);
  };

  return (
    <>
      <div className="image-container">
        <Carousel
          showArrows={true} // Show arrow navigation
          showStatus={false} // Hide status indicators
          showThumbs={false} // Hide thumbnail navigation
          infiniteLoop={true} // Infinite looping
          autoPlay={true} // Enable auto-play
          interval={3000} // Auto-play interval in milliseconds (3 seconds in this example)
        >
          <div className="set-WH">
            <img src={aries} alt="Image 1" />
            <div>
              <h1>Aries</h1>
              <p>
                {" "}
                Element: Fire
                <br />
                - Ruling Planet: Mars
                <br />- Traits: Energetic, adventurous, and competitive. Aries
                individuals are natural leaders with a passion for taking on
                challenges.
              </p>
              <button onClick={() => navigateToSubPage("Aries")}>GO</button>
            </div>
          </div>

          <div className="set-WH">
            <img src={cancer} alt="Image 2" />
            <div>
              <h1>Cancer</h1>
              <p>
                Element: Water
                <br />
                - Ruling Planet: Moon
                <br />- Traits: Nurturing, intuitive, and empathetic. Cancer
                individuals are deeply connected to their emotions and have a
                strong sense of loyalty to their loved ones.
              </p>
              <button onClick={() => navigateToSubPage("Cancer")}>GO</button>
            </div>
          </div>

          <div className="set-WH">
            <img src={aquarius} alt="Image 3" />
            <div>
              <h1>Aquarius</h1>
              <p>
                Element: Air
                <br />
                - Ruling Planet: Uranus and Saturn
                <br />- Traits: Innovative, independent, and humanitarian.
                Aquarians are often ahead of their time, embracing
                unconventional ideas and social causes.
              </p>
              <button onClick={() => navigateToSubPage("Aquarius")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={capricornstones} alt="Image 3" />
            <div>
              <h1>Capricorn</h1>
              <p>
                Element: Earth
                <br />
                - Ruling Planet: Saturn
                <br />- Traits: Ambitious, disciplined, and practical.
                Capricorns are hardworking individuals who value tradition and
                strive for success.
              </p>
              <button onClick={() => navigateToSubPage("Capricorn")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={geministones} alt="Image 3" />
            <div>
              <h1>Gemini</h1>
              <p>
                Element: Air
                <br />
                - Ruling Planet: Mercury
                <br />- Traits: Adaptable, curious, and communicative. Geminis
                are social butterflies with a love for variety and intellectual
                stimulation.
              </p>
              <button onClick={() => navigateToSubPage("Gemini")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={leostones} alt="Image 3" />
            <div>
              <h1>Leo</h1>
              <p>
                Element: Fire
                <br />
                - Ruling Planet: Sun
                <br />- Traits: Confident, charismatic, and generous. Leos love
                to be in the spotlight and are natural leaders with a warm and
                sunny personality.
              </p>
              <button onClick={() => navigateToSubPage("Leo")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={librastones} alt="Image 3" />
            <div>
              <h1>Libra</h1>
              <p>
                Element: Earth
                <br />
                - Ruling Planet: Venus
                <br />- Traits: Charming, diplomatic, and fair-minded. Libras
                seek balance and harmony in all aspects of life and are natural
                peacemakers.
              </p>
              <button onClick={() => navigateToSubPage("Libra")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={piecesstones} alt="Image 3" />
            <div>
              <h1>Pisces</h1>
              <p>
                Element: Water
                <br />
                - Ruling Planet: Neptune and Jupiter
                <br />- Traits: Compassionate, artistic, and intuitive. Pisceans
                are dreamers with a deep emotional side, often drawn to artistic
                and creative pursuits.
              </p>
              <button onClick={() => navigateToSubPage("Pisces")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={scorpiostones} alt="Image 3" />
            <div>
              <h1>Scorpio</h1>
              <p>
                Element: Water
                <br />
                - Ruling Planet: Jupiter
                <br />- Traits: Optimistic, adventurous, and open-minded.
                Sagittarians love exploration and are always seeking new
                experiences and knowledge.
              </p>
              <button onClick={() => navigateToSubPage("Scorpio")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={taurusstones} alt="Image 3" />
            <div>
              <h1>Taurus</h1>
              <p>
                Element: Earth
                <br />
                - Ruling Planet: Venus
                <br />
                Taurus - Traits: Patient, reliable, and determined. Taurus
                individuals value stability and are known for their practical
                approach to life.
              </p>
              <button onClick={() => navigateToSubPage("Taurus")}>GO</button>
            </div>
          </div>
          <div className="set-WH">
            <img src={virgostones} alt="Image 3" />
            <div>
              <h1>Virgo</h1>
              <p>
                Element: Earth
                <br />
                - Ruling Planet: Mercury
                <br />- Traits: Detail-orientedVirgo, practical, and analytical.
                Virgos have a keen eye for perfection and are known for their
                organizational skills.
              </p>
              <button onClick={() => navigateToSubPage("Virgo")}>GO</button>
            </div>
          </div>

          {/* Add more images as needed */}
        </Carousel>
      </div>
    </>
  );
};

export default MyCarousel;
