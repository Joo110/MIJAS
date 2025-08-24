import './LandingSection.css';
import PartnersSection from './PartnersSection';

function LandingSection() {
  const scrollToFooter = (e) => {
    e.preventDefault();
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="landing">
        <div className="container">
          <div className="text">
            <h1
              className="hero-title hero-strong"
              style={{ color: 'hsla(120, 16%, 54%, 1.00)' }}
            >
              WE ARE MIJAS
            </h1>

            <div className="hero-sub">
  <p className="hero-line">Ambitious</p>
  <p className="hero-line">Engineers in</p>
  <p className="hero-line">Service to Society</p>
  <p className="hero-line hero-strong">Innovate Build Sustain</p>

{!localStorage.getItem('token') && (
    <button
      className="hero-button"
      onClick={() =>
        document.getElementById('join').scrollIntoView({ behavior: 'smooth' })
      }
    >
      Join Us
    </button>
  )}

</div>


          </div>

          <div className="image">
            <img
              decoding="async"
              src="/s.svg"
              alt="Landing"
              style={{ marginLeft: '60px', maxWidth: '100%' }}
            />
          </div>
        </div>

        <a href="#footer" className="go-down" onClick={scrollToFooter}>
          <i className="fas fa-angle-double-down fa-5x"></i>
        </a>
      </div>

      <PartnersSection />

<div className="discount" id="discount">
  <div className="image">
    <div className="content"></div>
  </div>
  <div className="form" id="join"> {/* ✅ id=join */}
    <div className="content">
      <h2>Join Us & Request</h2>
      <form action="https://formspree.io/f/movlgvyb" method="POST">
        <input className="input" type="text" placeholder="Your Name" name="name" required />
        <input className="input" type="email" placeholder="Your Email" name="email" required />
        <input className="input" type="text" placeholder="Your Phone" name="mobile" />
        <textarea className="input" placeholder="Tell Us About Your Needs" name="message"></textarea>
        
        {/* ✅ Dropdown جديد */}
        <select className="input" name="type" required>
          <option value="">Select Option</option>
          <option value="request">Request</option>
          <option value="joinus">Join Us</option>
        </select>

        <input type="submit" value="Send" />
      </form>
    </div>
  </div>
</div>
{/* ======= Join Us Ends Here ======= */}


      {/* ======= Footer Section Starts Here ======= */}
      <footer id="footer">
  <div className="footer-container">
    <div className="box">
      <h3>Mijas</h3>
      <ul className="social">
        <li><a href="https://www.facebook.com/share/1GQwjy8KrU/"><i className="fab fa-facebook-f"></i></a></li>
        <li><a href="https://www.instagram.com/mijas.jo?igsh=b2NibnAxbDh0MjE5"><i className="fab fa-instagram"></i></a></li>
      </ul>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Temporibus nulla rem, dignissimos iste aspernatur
      </p>
    </div>
    <div className="box">
      <div className="line">
        <i className="fas fa-map-marker-alt fa-fw"></i>
        <div className="info">Egypt, Giza, Inside The Sphinx, Room Number 220</div>
      </div>
      <div className="line">
        <i className="far fa-clock fa-fw"></i>
        <div className="info">Business Hours: From 10:00 To 18:00</div>
      </div>
      <div className="line">
        <i className="fas fa-phone-volume fa-fw"></i>
        <div className="info">
          <span>+20123456789</span>
          <span>+20198765432</span>
        </div>
      </div>
    </div>
  </div>
</footer>

      {/* ======= Footer Section Ends Here ======= */}
    </>
  );
}

export default LandingSection;
