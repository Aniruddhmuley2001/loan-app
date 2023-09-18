import { useEffect } from 'react';

const useScript1 = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    
    script.crossOrigin="anonymous";
    script.integrity="https://getbootstrap.com/docs/5.3/dist/js/bootstrap.bundle.min.js";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript1;