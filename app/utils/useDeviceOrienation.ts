import { useEffect, useState } from "react";

type OrientationEvent = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

const { abs } = Math;

function useDeviceOrientation(threshold: number) {

  const initialOrientation = typeof window === undefined 
    ? undefined
    :  abs(window.orientation) <= threshold;

  const [isDeviceFlat, setIsDeviceFlat] = useState<boolean | undefined>(initialOrientation);

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

    if (typeof window !== undefined && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      if (typeof window !== undefined && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [threshold]);

  return isDeviceFlat;
}

export default useDeviceOrientation;