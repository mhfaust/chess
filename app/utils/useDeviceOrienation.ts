import { useEffect, useState } from "react";

type OrientationEvent = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

const { abs } = Math;

function useDeviceOrientation(threshold: number) {

  const isClient = typeof window === 'object';

  const initialOrientation = isClient
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

    if (isClient && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      if (isClient && window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, [isClient, threshold]);

  return isDeviceFlat;
}

export default useDeviceOrientation;