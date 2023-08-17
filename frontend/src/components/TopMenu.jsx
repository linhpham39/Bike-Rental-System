import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BikeStore13
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/account/signin">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/account/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dock/">
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dock/D5">
                Dock D5
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dock/D3">
                Dock D3
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dock/D7">
                Dock D7
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dock/D9">
                Dock D9
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dock/B1">
                Dock B1
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/dock/romance">
                Romance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dock/food-drink">
                Food & Drink
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
