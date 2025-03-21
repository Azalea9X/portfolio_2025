
"use client";
import { useEffect } from "react";

 const Animate:any = () => {
  useEffect(() => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.classList.add('animate__animated', 'bounce');
    });
    return () => {
      projectCards.forEach((card) => {
        card.classList.remove('animate__animated');
      });
    };
  }, []);
}

export default Animate; 