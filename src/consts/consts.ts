export const API_ROOT = `https://api.corona-live.com/`;

export const CITY_TD_FLEX = ["0.45", "0.2", "1.3", "1", "0 1 80px"];
export const DISTRICT_TD_FLEX = ["0.7", "0.25", "1", "1", "0 1 80px"];

export const CITY_IDS = [...Array(16).keys()];

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export const WEBSITE_URL = `https://corona-live.com`;
export const FACEBOOK_URL = `https://www.facebook.com/sharer/sharer.php?u=${WEBSITE_URL}%2F&amp;src=sdkpreparse`;
export const BLOG_URL = `http://blog.naver.com/openapi/share?url=${WEBSITE_URL}&title=[코로나 라이브] 코로나 현황 실시간으로 보기`;
export const TWITTER_URL = `http://twitter.com/share?url=${WEBSITE_URL}&text=코로나 현황 실시간으로 보기`;
export const KAKAOPAY_URL = `https://qr.kakaopay.com/281006011172839271003566`;
export const TWITTER_SNS_URL = `https://twitter.com/kCm2v4r1PvpSE7A`;
export const INSTA_SNS_URL = `https://www.instagram.com/corona.live.kr/`;

export const EMAIL_API = `https://64t2pyuhje.execute-api.ap-northeast-2.amazonaws.com/corona-live-email`;
export const EMAIL = `corona.live.kr@gmail.com`;
export const URL_REGEX = /(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*).\w+/gi;

export const IMPORTANT_MESSAGE = `
코로나 라이브는 재난문자와 각 지자체및 질병관리본부에서 <strong>금일 제공하는 자료</strong>를
기반으로 코로나 현황을 실시간으로 제공 하고있습니다 <br><br> 하지만 검역과 대구는 당일발생 확진자 정보를 제공 안해서 집계가 불가능합니다 <br><br>   민간이 취합한 집계이므로 공식적인
근거 자료로 활용될수 없고, 본사이트에서 제공하는 오늘 확진자수는 다음날 제공하는 질본 수치와 <strong> 오차가 발생할수 있습니다</strong>
<br><br>  본사이트에서 제공하는 정보 사용/공유로 인해 발생된 문제의 책임은<strong>
전적으로 사용자에게 있습니다.</strong>
<br><br>정보 오류나 누락 발견시 제보하여주시기 바랍니다
`;

const CHART_PRIMARY_COLOR = `#5673EB`;
const CHART_SECONDARY_COLOR = `#999999`;

export const lineChartData: Chart.ChartData = {
  datasets: [
    {
      label: "오늘",
      fill: true,
      backgroundColor: `${CHART_PRIMARY_COLOR}`,
      borderColor: `${CHART_PRIMARY_COLOR}90`,
      pointRadius: 5,
      pointBackgroundColor: `${CHART_PRIMARY_COLOR}`,
      pointBorderColor: Array(24).fill(`${CHART_PRIMARY_COLOR}50`),
      pointBorderWidth: Array(24).fill(1),
      hoverBackgroundColor: `${CHART_PRIMARY_COLOR}`,
      hoverBorderWidth: 20,
      pointHoverBorderColor: `${CHART_PRIMARY_COLOR}50`,
      hoverRadius: 5,
      lineTension: 0,
      borderWidth: 2,
    },
    {
      label: "어제",
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: `${CHART_SECONDARY_COLOR}`,
      pointBorderColor: Array(10).fill(`${CHART_PRIMARY_COLOR}60`),
      hoverBackgroundColor: `${CHART_SECONDARY_COLOR}`,
      pointBorderWidth: Array(24).fill(1),
      backgroundColor: "transparent",
      hoverRadius: 5,
      borderColor: `${CHART_SECONDARY_COLOR}40`,
      lineTension: 0,
      borderWidth: 2,
    },
  ],
};

export const lineChartOptions = (isDelta, theme) => ({
  responsive: true,
  tooltips: {
    enabled: false,
  },
  legend: {
    position: "top",
    labels: {
      fontColor: "white",
      boxWidth: 20,
    },
    display: false,
  },
  scales: {
    gridLines: {
      drawBorder: false,
      display: false,
    },
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          stepSize: isDelta ? 20 : 100,
          autoSkip: true,
          callback: (value) => {
            if (value !== 0) return value;
          },
        },
        position: "right",
        gridLines: {
          color: `${theme("blackText")}10`,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: `${theme("blackText")}B0`,
          fontSize: 11,
          autoSkip: true,
          autoSkipPadding: 14,
          maxRotation: 0,
          callback: (value) => {
            if (value !== 0) return `${value}${parseInt(value) ? "시" : ""}`;
          },
        },
        gridLines: {
          color: `${theme("blackText")}10`,
          display: false,
        },
      },
    ],
  },
});

export { default as CITIES } from "./cities.json";
