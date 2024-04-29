import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ScreenreaderLabelExample() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setHidden(true); // Quando atingir 100%, esconda a barra de progresso
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {!hidden && (
        <ProgressBar
          now={progress}
          label={`${progress}%`}
          visuallyHidden
          className="custom-progress-bar"
        />
      )}
    </>
  );
}

export default ScreenreaderLabelExample;
