import React from "react";
import { Link } from "react-router-dom";

function Interviewer({ user }) {
  return (
    <Link to={`/interview/${user.id}`}>
      <div className="item">
        <div className="box">
          <p>{user.no}</p>
        </div>
        <img src={user.src} alt={user.alt} />
        <div className="txt">
          <h4>{user.position}</h4>
          <p>
            <span>{user.name}</span>
            <br />
            <span>{user.date}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Interviewer;
