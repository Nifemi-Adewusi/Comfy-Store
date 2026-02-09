import { useState, useEffect } from "react";

const Typewriter = ({
  text,
  delay = 2000,
  infinite = true,
  typeSpeed = 200,
  deleteSpeed = 100,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const currentString = Array.isArray(text) ? text[textIndex] : text;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentString.length) {
            setCurrentText((prev) => prev + currentString[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else {
            if (infinite) {
              setIsDeleting(true);
            }
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextIndex((prev) => (prev + 1) % text.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentIndex,
    text,
    textIndex,
    infinite,
    typeSpeed,
    deleteSpeed,
  ]);

  return <span>{currentText}</span>;
};

export default Typewriter;
