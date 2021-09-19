import React from "react";
import { Link } from "react-router-dom";

const Choose = () => {
  return (
    <div className="content">
      <section className="student">
        <Link className="bln btn btn-dark btn-lg" to="/student/login">
          Student
        </Link>
      </section>

      <section className="faculty">
        <Link className="bln btn btn-dark btn-lg" to="/faculty/login">
          Faculty
        </Link>
      </section>
    </div>
  );
};

export default Choose;
