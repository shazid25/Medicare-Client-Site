import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AOSWrapper = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration 1s
      once: true,     // animate only once
    });
    AOS.refresh();
  }, []);

  return children;
};

export default AOSWrapper;
