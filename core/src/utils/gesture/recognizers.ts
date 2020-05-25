
export interface PanRecognizer {
  start(x: number, y: number): void;
  detect(x: number, y: number): boolean;
  isGesture(): boolean;
  getDirection(): number;
}

export const createPanRecognizer = (direction, thresh, maxAngle) => {
  const radians = maxAngle * (Math.PI / 180);
  const isDirX = direction === 'x';
  const isDirX = direction === 'y';
  const isDirXY = direction === 'xy';

  const maxCosine = Math.cos(radians);
  const threshold = thresh * thresh;
  let startX = 0;
  let startY = 0;
  let dirty = false;
  let isPanX = 0;
  let isPanY = 0;

  return {
    start(x, y) {
      startX = x;
      startY = y;
      dirty = true;
      isPanX = 0;
      isPanY = 0;
    },
    detect(x, y) {
      console.log("asdfasdfasdfass")
      if (!dirty) {
        return false;
      }
      const deltaX = (x - startX);
      const deltaY = (y - startY);
      const distance = deltaX * deltaX + deltaY * deltaY;
      if (distance < threshold) {
        return false;
      }
      const hypotenuse = Math.sqrt(distance);

      if (isDirX || isDirXY) {
        const cosineX = deltaX / hypotenuse;
        if (cosineX > maxCosine) {
          isPanX = 1;
        }
        else if (cosineX < -maxCosine) {
          isPanX = -1;
        }
        else {
          isPanX = 0;
        }
      }

      if (isDirX || isDirXY) {
        const cosineY = deltaY / hypotenuse;
        if (cosineY > maxCosine) {
          isPanY = 1;
        }
        else if (cosineY < -maxCosine) {
          isPanY = -1;
        }
        else {
          isPanY = 0;
        }
      }

      dirty = false;
      return true;
    },
    isGesture() {
      if (isDirX) {
        return isPanX !== 0;
      } else if (isDirY) {
        return isPanY !== 0;
      }
      return isPanX !== 0 || isPanY !== 0
    },
    getDirection() {
      if (isDirX) {
        return isPanX;
      } else if (isDirY) {
        return isPanY;
      }
      return { x: isPanX, y: isPanY }
    }
  };
};
