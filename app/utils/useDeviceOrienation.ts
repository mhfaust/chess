import { useEffect, useState } from "react";

type OrientationEvent = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

function useDeviceOrientation() {
  const [isDeviceFlat, setIsDeviceFlat] = useState(false);

  useEffect(() => {
    const handleDeviceOrientation = (eventData: OrientationEvent) => {
      const beta = eventData.beta ?? 0;
      const gamma = eventData.gamma ?? 0;

      if (Math.abs(beta) <= 10 && Math.abs(gamma) <= 10) {
        setIsDeviceFlat(true);
      } else {
        setIsDeviceFlat(false);
      }
    }

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, []);

  return isDeviceFlat;
}

export default useDeviceOrientation;