import React, { useEffect, useState } from "react";

function ToTopBtn() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return <>{showTopBtn && <button onClick={handleScrollTop} className="top-btn"></button>}</>;
}

export default ToTopBtn;
