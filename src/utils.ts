import { URL_REGEX, MINUTE, HOUR, DAY, SECOND, CITIES } from "@consts";

export const ct = (cityId, guId = undefined) => {
  let cityName = CITIES[`c${cityId}`] || "";
  let guName = CITIES[`c${cityId}/${guId}`] || "";
  guName = guName == cityName || guId == "_" ? "전체" : guName;
  return guId != undefined ? guName : cityName;
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

const getTime = (time) => {
  let [hours, minutes, seconds] = time.toString().split(":");
  let date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds || "00");

  return date;
};

const EARLIEST = 6;
const LATEST = 24;

const setUpdatesTimeRange = (updates, to, from = "00:00:00") => {
  return updates
    .filter(({ datetime }) => {
      if (!datetime) return false;
      let [_, _time] = datetime.split(" ");
      let time = getTime(_time);
      return time > getTime(from) && time < getTime(to);
    })
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
};

const getTimeSeries = (updates, cityId) => {
  const currentHour = getCurrentTime().split(":")[0];
  const maxHour = currentHour > EARLIEST ? currentHour : EARLIEST;

  let timeseries = {};
  [...Array(LATEST - EARLIEST).keys()].map((i) => {
    let prev = i + EARLIEST;
    let next = prev + 1;
    if (next <= maxHour)
      timeseries[prev + 1] = setUpdatesTimeRange(updates, `${next}:00:00`, `${prev}:00:00`)
        .filter(({ city }) => city == cityId)
        .reduce((total, { cases }) => (total += cases), 0);
  });

  let total = Object.keys(timeseries).reduce((total, timePeriod) => {
    total += timeseries[timePeriod];
    timeseries[timePeriod] = [Math.max(total, 0), Math.max(timeseries[timePeriod], 0)];
    return total;
  }, 0);

  return [timeseries, total];
};

export const getStatistic = (
  stats,
  realtimeValue,
  dataType: "today" | "yesterday",
  chartType,
  cityId
) => {
  let { timeseries, regionsTimeseries } = stats;
  let chartIndex = chartType == "total" ? 0 : 1;
  let data = timeseries[dataType];
  if (cityId != null) {
    data = regionsTimeseries[dataType][cityId];
    let timeseries = Object.keys(data).map((time) => data[time][chartIndex]);
    // let dataTypeId = dataType == "today" ? 0 : 1;
    let current;
    let todayCurrent = stats.current[cityId].cases[0];
    let todayDelta = stats.current[cityId].cases[1];

    // if (dataType == "today") {
    // }
    current = dataType == "today" ? todayCurrent : todayCurrent - todayDelta;
    // if (dataType == "yesterday")
    timeseries.pop();
    // timeseries.pop();
    // if (dataType == "today") {
    //   current = todayCurrent;
    // } else {
    //   current = todayCurrent - todayDelta;
    // }
    timeseries.push(current);
    return timeseries;
  }
  // if (updates) {
  //   let [newUpdates, total] = getTimeSeries(updates, cityId);
  //   data = newUpdates;
  //   realtimeValue = total;
  //   console.log({ updates });
  // }
  let latestHour = Math.max(...Object.keys(data).map((a) => Number(a)));
  let latestValue = data[latestHour][0];

  let previousStats = Object.keys(data).map((time) => data[time][chartIndex]);
  let currentStats;

  currentStats = chartType == "total" ? realtimeValue : realtimeValue - latestValue;
  // if (dataType == "today") {
  // } else {
  //   currentStats = chartType == "total" ? realtimeValue : realtimeValue - latestValue;
  // }

  return [...previousStats, currentStats];
};

export const getSuggestedMax = (max, stepSize) => {
  // let stepSize = isDelta ? 10 : 30;
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
