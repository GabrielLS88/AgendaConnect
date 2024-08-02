import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Spinner.css';

function ScreenreaderLabelExample() {
  const [setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setHidden(true);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  },);

  return (
    <div className="bodySpiner">
      <div className="blocoSpiner">
        {!hidden && (
          <Spinner
            animation="border"
            className="custom-progress-bar"
          />
        )}
        <div id='escritaLoading'>
          {'loading'.split('').map((char, index) => (
            <span key={index} className="loading-char" style={{ animationDelay: `${index * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScreenreaderLabelExample;
