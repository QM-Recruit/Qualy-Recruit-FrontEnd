import React, { useEffect } from "react";

function RedirectLink() {
  useEffect(() => {
    window.location.href = "/#interview";
  }, []);

  return null; // This component doesn't need to render anything
}

export default RedirectLink;
