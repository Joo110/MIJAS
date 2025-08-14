function NavbarForGuest() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/طط.webp" alt="Logo" width="180" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link fw-bold" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-bold login-link" href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h2 className="text-center">Welcome to Our Site</h2>
      </div>
    </>
  );
}

export default NavbarForGuest;
