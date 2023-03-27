import { useEffect, useState } from "react";

type OrientationEvent = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

const { abs } = Math;

function useDeviceOrientation(threshold: number) {
  const [isDeviceFlat, setIsDeviceFlat] = useState<boolean | undefined>(
    window.orientation ? abs(window.orientation) <= threshold :  undefined);

  useEffect(() => {
    const handleDeviceOrientation = (eventData: OrientationEvent) => {
      const beta = eventData.beta ?? 0;
      const gamma = eventData.gamma ?? 0;

      if (abs(beta) <= threshold && abs(gamma) <= threshold) {
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
  }, [threshold]);

  return isDeviceFlat;
}

export default useDeviceOrientation;