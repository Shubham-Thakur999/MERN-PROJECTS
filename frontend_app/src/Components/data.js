const API_KEY = "AIzaSyCWB2XdNeEDKBLyPwPAZ63wlrkww1iurCQ";

const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};

export default API_KEY;
export { value_converter };
