export const enum ScreenSize {
  xxs = 375,
  xs = 414,
  sm = 768,
  md = 1024,
  lg = 1366,
  xl = 1440,
  xxl = 1920,
  xxxl = 2560,
}

interface Result {
  windowSize: number;
}

const useWindowSize = (): Result => {
  return { windowSize: window.innerWidth };
};

export default useWindowSize;
