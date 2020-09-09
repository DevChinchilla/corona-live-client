import { URL_REGEX, MINUTE, HOUR, DAY, SECOND, CITIES } from "@consts";

export const ct = (cityId, guId = null) => {
  let cityName = CITIES[`c${cityId}`] || "";
  let guName = CITIES[`c${cityId}/${guId}`] || "";
  guName = guName == cityName || guId == "_" ? "전체" : guName;
  return guId != null ? guName : cityName;
};

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const fetcher = (url) => {
  return fetch(`${url}?timestamp=${new Date().getTime()}`, {}).then((response) => {
    return response.json();
  });
};

export const sortByDate = (arr, key = "datetime") => {
  const array = [...arr];
  array.sort((a, b) => {
    let dateA = key ? a[key] : a;
    let dateB = key ? b[key] : b;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
  return array;
};

export const addZero = (num) => {
  return num > 9 ? num : `0${num}`;
};

export const getDateDistance = (_past) => {
  const now = new Date();
  const past = new Date(_past);
  const diffTime = Math.abs(now.getTime() - past.getTime());
  if (diffTime < MINUTE) {
    return `${Math.floor(diffTime / SECOND)}초 전`;
  } else if (diffTime < HOUR) {
    return `${Math.floor(diffTime / MINUTE)}분 전`;
  } else if (diffTime < DAY) {
    return `${Math.floor(diffTime / HOUR)}시간 전`;
  }
  return null;
};

export const getCurrentDateTime = () => {
  let date = new Date();
  let month = addZero(date.getMonth() + 1);
  let day = addZero(date.getDate());
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  let ampm = "AM";
  if (hours >= 12) {
    hours -= 12;
    ampm = "PM";
  }

  return `${month}월 ${day}일 ${hours}:${minutes}${ampm}`;
};

export const getCurrentTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

export const onEnter = (func) => (e) => {
  console.log(e.key == "Enter");
  if (e.key == "Enter") func(e);
};

export const jsonCompare = (a, b) => {
  return JSON.stringify(a) == JSON.stringify(b);
};

export const sleep = (timeout) => {
  return new Promise((res) => setTimeout(res, timeout));
};

export const addHyperLink = (text) => {
  return text.replace(
    URL_REGEX,
    (url) => `<a href="http://${url.replace(/https?:\/\//, "")}">${url}</a>`
  );
};

export const setGradient = (canvas, color) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 140);

  gradient.addColorStop(0, `${color}70`);
  gradient.addColorStop(1, `${color}00`);

  return gradient;
};

export const getStatistic = (data, realtimeValue, dataType: "today" | "yesterday", chartType) => {
  let latestHour = Math.max(...Object.keys(data).map((a) => Number(a)));
  let latestValue = data[latestHour][0];
  let chartIndex = chartType == "total" ? 0 : 1;

  let previousStats = Object.keys(data).map((time) => data[time][chartIndex]);
  let currentStats;

  if (dataType == "today") {
    currentStats = chartType == "total" ? realtimeValue : realtimeValue - latestValue;
  } else {
    currentStats = chartType == "total" ? realtimeValue : realtimeValue - latestValue;
  }

  return [...previousStats, currentStats];
};
