'use client';

import React from 'react';
import './LandingSection.css'; // أو استخدم ملف CSS خاص لو حابب (Partners.css)

const PartnersSection: React.FC = () => {
  return (
    <section className="partners-page" id="partners">   {/* ✅ هنا ضفنا id */}
      <div className="partners-container">
        <h2 className="partners-title">Partners</h2>

        <div className="partners-canvas">
          {/* Top left logo */}
          <div className="partner-item partner-top-left">
            <div className="partner-inner">
              <img src="/partner2.png" alt="Belladonna" />
            </div>
          </div>

          {/* Top right logo */}
          <div className="partner-item partner-top-right">
            <div className="partner-inner partner-border-green">
              <img src="/partner1.png" alt="Box" />
            </div>
          </div>

          {/* Center small ribbon (mikroelectron) */}
          <div className="partner-center">
            <div className="partner-ribbon">
              <img src="/partner5.png" alt="Mikroelectron" />
            </div>
          </div>

          {/* Bottom left dark circle */}
          <div className="partner-item partner-bottom-left">
            <div className="partner-inner">
              <img src="/partner4.png" alt="Amman Story" />
            </div>
          </div>

          {/* Bottom right beige circle */}
          <div className="partner-item partner-bottom-right">
            <div className="partner-inner partner-beige">
              <img src="/partner3.png" alt="Amman Story" />
            </div>
          </div>

          {/* central glow */}
          <div className="partners-glow" />
        </div>

        <p className="partners-desc">
          We're proud to work alongside these amazing partners who help us deliver
          exceptional value and innovative solutions to our clients worldwide.
        </p>
      </div>
    </section>
  );
};

export default PartnersSection;
