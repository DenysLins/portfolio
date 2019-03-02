import * as React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row align-items-end">
          <div className="col">
            <div class="d-flex justify-content-center">
              <Link to="/second">
                <FontAwesomeIcon icon={faArrowDown} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
