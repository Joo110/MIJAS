import './LandingSection.css';

function LandingSection() {
  return (
    <>
      <div className="landing">
        <div className="container">
          <div className="text">
            <h1>Welcome, To Mijas</h1>
            <p>
              Here I am gonna share everything about my life. Books I am reading, I am Developer,
              App and Web
            </p>
          </div>
          <div className="image">
            <img decoding="async" src="/landing-image.png" alt="Landing" />
          </div>
        </div>
        <a href="#articles" className="go-down">
          <i className="fas fa-angle-double-down fa-2x"></i>
        </a>
      </div>

      {/* ======= Discount Section Starts Here ======= */}
      <div className="discount" id="discount">
        <div className="image">
          <div className="content">
            <h2>We Have A Discount</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi asperiores consectetur,
              recusandae ratione provident necessitatibus, cumque delectus commodi fuga praesentium beatae.
              Totam vel similique laborum dicta aperiam odit doloribus corporis.
            </p>
            <img src="/imgs/discount.png" alt="Discount" />
          </div>
        </div>
        <div className="form">
          <div className="content">
            <h2>Request A Discount</h2>
            <form>
              <input className="input" type="text" placeholder="Your Name" name="name" />
              <input className="input" type="email" placeholder="Your Email" name="email" />
              <input className="input" type="text" placeholder="Your Phone" name="mobile" />
              <textarea className="input" placeholder="Tell Us About Your Needs" name="message" />
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
      </div>
      {/* ======= Discount Section Ends Here ======= */}

      {/* ======= Footer Section Starts Here ======= */}
      <footer>
        <div className="container">
          <div className="box">
            <h3>Mijas</h3>
            <ul className="social">
              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-youtube"></i></a></li>
            </ul>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Temporibus nulla rem, dignissimos iste aspernatur
            </p>
          </div>
          <div className="box">
            <ul className="links">
              <li><a href="#">Important Link 1</a></li>
              <li><a href="#">Important Link 2</a></li>
              <li><a href="#">Important Link 3</a></li>
              <li><a href="#">Important Link 4</a></li>
              <li><a href="#">Important Link 5</a></li>
            </ul>
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
