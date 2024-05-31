import React from "react";

function SnsItem({ data }) {
  return (
    <li>
      <a href={data.link} target="blank">
        <img src={data.src} alt={data.alt} />
      </a>
    </li>
  );
}

export default SnsItem;
