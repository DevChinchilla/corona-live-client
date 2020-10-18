import { URL_REGEX, MINUTE, HOUR, DAY, SECOND, CITIES } from "@consts";

export const ct = (cityId, guId = undefined) => {
  let cityName = CITIES[`c${cityId}`] || "";
  let guName = CITIES[`c${cityId}/${guId}`] || "";
  guName = guName == cityName || guId == "_" ? "전체" : guName;
  return guId != undefined ? guName : cityName;
};

export const numberWithCommas = (number) => {
  if (!number) return number;
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
  } else {
    return `${Math.floor(diffTime / DAY)}일 전`;
  }
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
  const gradient = ctx.createLinearGradient(0, 0, 0, 170);

  gradient.addColorStop(0, `${color}80`);
  gradient.addColorStop(1, `${color}00`);

  return gradient;
};

export const getStatistic = (stats, dataType: "today" | "yesterday", chartType, cityId) => {
  let { timeseries, regionsTimeseries } = stats;
  let chartIndex = chartType == "total" ? 0 : 1;
  let data = cityId != null ? regionsTimeseries[dataType][cityId] : timeseries[dataType];
  return Object.keys(data).map((time) => data[time][chartIndex]);
};

export const getSuggestedMax = (max, stepSize) => {
  let levels = Math.ceil(max / stepSize);
  let leftover = stepSize - (max % stepSize || stepSize);
  let suggestedMax = leftover < stepSize * 0.2 ? (levels + 1) * stepSize : levels * stepSize;
  return suggestedMax;
};

export const getCasesSummary = (updates) => {
  const totalCases = updates.reduce(
    (t, { cases, total }) => (t += Number(total) || Number(cases)),
    0
  );
  const todayCases = updates.reduce((t, { cases }) => (t += Number(cases)), 0);
  const checking = updates.reduce(
    (t, { cases, total }) => (t += cases == null ? Number(total) : 0),
    0
  );
  const yesterdayCases = totalCases - todayCases - checking;
  return { todayCases, totalCases, yesterdayCases, checking };
};
