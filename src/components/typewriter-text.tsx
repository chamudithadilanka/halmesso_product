"use client";

import { useEffect, useState } from "react";

const PHRASES = ["every spoon.", "every meal.", "every bite."];
const TYPE_DELAY = 72;
const DELETE_DELAY = 38;
const PHRASE_PAUSE = 1500;

export default function TypewriterText() {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let phraseIndex = 0;
    let currentText = PHRASES[0];
    let deleting = true;
    let timeoutId = 0;

    const advance = () => {
      if (deleting) {
        currentText = currentText.slice(0, -1);
        setText(currentText);

        if (currentText.length === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % PHRASES.length;
          timeoutId = window.setTimeout(advance, 180);
        } else {
          timeoutId = window.setTimeout(advance, DELETE_DELAY);
        }
        return;
      }

      currentText = PHRASES[phraseIndex].slice(0, currentText.length + 1);
      setText(currentText);

      if (currentText === PHRASES[phraseIndex]) {
        deleting = true;
        timeoutId = window.setTimeout(advance, PHRASE_PAUSE);
      } else {
        timeoutId = window.setTimeout(advance, TYPE_DELAY);
      }
    };

    timeoutId = window.setTimeout(advance, PHRASE_PAUSE);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <span className="hero-typewriter" aria-hidden="true">
      <span className="hero-typewriter-measure">every spoon.</span>
      <span className="hero-typewriter-visible">{text}</span>
    </span>
  );
}