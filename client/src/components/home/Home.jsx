import * as React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="home">
        <div className="row align-items-end">
          <div className="col">
            <div className="d-flex justify-content-center">
              <Link to="/section_one#section_one">
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
