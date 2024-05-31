import React from "react";
import Crud from "../backend/Crud";
import Posts from "../backend/Posts";
import "../assets/css/table.css";

function Admin() {
  return (
    <div className="admin-panel">
      <Crud />
      <Posts />
    </div>
  );
}

export default Admin;
