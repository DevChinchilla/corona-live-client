const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const fetcher = (url) => {
  return fetch(url).then((response) => {
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
  if (hours > 12) {
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

const getTime = (time) => {
  let [hours, minutes, seconds] = time.toString().split(":");
  let date = new Date();

  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds || "00");

  return date;
};

export const getStatsWithUpdates = (updates) => {
  const stats = {};
  let total = 0;
  updates.map((info) => {
    let { gu, city, district, cases } = info;
    if (cases) {
      let casesInt = parseInt(cases);
      let [_city, _gu] = city != null ? [city, gu] : district.split(" ");

      if (!stats[_city]) stats[_city] = { district: {}, cases: 0 };
      if (!stats[_city].district[_gu]) stats[_city].district[_gu] = 0;
      stats[_city].district[_gu] += casesInt;
      stats[_city].cases += casesInt;
      total += casesInt;
    }
  });

  return [stats, total as number];
};

const getCityDelta = ({ todayStats, yesterdayStats, cityId }) => {
  let today = todayStats[cityId]?.cases || 0;
  let yesterday = yesterdayStats[cityId]?.cases || 0;
  let delta = today - yesterday;
  return {
    total: today,
    yesterday,
    delta,
  };
};

const getDistrictDelta = ({ todayStats, yesterdayStats, cityId, guId }) => {
  let today = todayStats[cityId]?.district[guId] || 0;
  let yesterday = yesterdayStats[cityId]?.district[guId] || 0;
  let delta = today - yesterday;
  return {
    total: today,
    yesterday,
    delta,
  };
};

export const getLatestTime = (updates) => {
  return sortByDate(updates)[0].datetime.split(" ")[1];
};

export const setUpdatesTimeRange = (updates, to, from = "00:00:00") => {
  return sortByDate(
    updates.filter(({ datetime }) => {
      let [_, _time] = datetime.split(" ");
      let time = getTime(_time);
      return time > getTime(from) && time < getTime(to);
    })
  );
};

export const getStatsDeltaV2 = (todayUpdates, yesterdayUpdates) => {
  const statsDelta = { total: {}, delta: {} };
  const currentTime = getCurrentTime();

  const [todayStats, todayTotal] = getStatsWithUpdates(todayUpdates);
  const [yesterdayStats, yesterdayTotal] = getStatsWithUpdates(
    setUpdatesTimeRange(yesterdayUpdates, "20:00:00")
  );

  Object.keys(todayStats).map((cityId) => {
    let today = todayStats[cityId]?.cases || 0;
    let yesterday = yesterdayStats[cityId]?.cases || 0;
    let delta = today - yesterday;
    statsDelta.total[cityId] = { cases: today, gu: {} };
    statsDelta.delta[cityId] = { cases: delta, gu: {} };

    Object.keys(todayStats[cityId].district).map((guId) => {
      let today = todayStats[cityId]?.district[guId] || 0;
      let yesterday = yesterdayStats[cityId]?.district[guId] || 0;
      let delta = today - yesterday;
      statsDelta.total[cityId].gu[guId] = today;
      statsDelta.delta[cityId].gu[guId] = delta;
    });
  });
  const delta = Number(todayTotal) - Number(yesterdayTotal);
  const todayDelta = { total: todayTotal, delta };
  return [statsDelta, todayDelta];
};
