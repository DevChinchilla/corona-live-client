export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getCurrentDateTime = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return `${month}월 ${day}일 ${hours}:${minutes}`;
};
