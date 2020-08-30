import { ChartData } from "react-chartjs-2";

export const TODAY_API_ROOT = "https://api.coronamap.live/today.json";
// export const API_ROOT = `https://apiv3.corona-live.com/`;
export const API_ROOT = `https://api.corona-live.com/`;

// export const API_ROOT = "https://devchinchilla.github.io/corona-live-api-v2/";
export const CITY_TD_FLEX = ["0.45", "0.2", "1.3", "1", "0 1 80px"];
export const DISTRICT_TD_FLEX = ["0.7", "0.25", "1", "1", "0 1 80px"];
export const CITY_IDS = [...Array(16).keys()];

export const WEBSITE_URL = `https://corona-live.com`;
export const FACEBOOK_URL = `https://www.facebook.com/sharer/sharer.php?u=${WEBSITE_URL}%2F&amp;src=sdkpreparse`;
export const BLOG_URL = `http://blog.naver.com/openapi/share?url=${WEBSITE_URL}&title=[코로나 라이브] 코로나 현황 실시간으로 보기`;
export const TWITTER_URL = `http://twitter.com/share?url=${WEBSITE_URL}&text=코로나 현황 실시간으로 보기`;
export const KAKAOPAY_URL = `https://qr.kakaopay.com/281006011172839271003566`;
export const TWITTER_SNS_URL = `https://twitter.com/kCm2v4r1PvpSE7A`;
export const INSTA_SNS_URL = `https://www.instagram.com/corona.live.kr/`;

export const EMAIL_API = `https://64t2pyuhje.execute-api.ap-northeast-2.amazonaws.com/corona-live-email`;

export const URL_REGEX = /(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*).\w+/gi;

export const IMPORTANT_MESSAGE = `
코로나 라이브는 재난문자와 각 지자체및 질병관리본부에서 <strong>금일 제공하는 자료</strong>를
기반으로 코로나 현황을 실시간으로 제공 하고있습니다 <br><br> 하지만 민간이 취합한 집계이므로 공식적인
근거 자료로 활용될수 없고, 본사이트에서 제공하는 오늘 확진자수는 다음날 제공하는 질본 수치와 <strong> 오차가 발생할수 있습니다</strong>
<br><br>  본사이트에서 제공하는 정보 사용/공유로 인해 발생된 문제의 책임은<strong>
전적으로 사용자에게 있습니다.</strong>
<br><br>정보 오류나 누락 발견시 제보하여주시기 바랍니다
`;

export const MUST_READ = `
어제 공지로 말씀드렸다시피 새로운 집계 방식으로 재난 문자 알림이 오면 지자체 사이트 확인 후 당일 확진 판정된 환자만 포함해서 집계를 하고 있었습니다<br></br>
예를 들어 재난 문자로는 8명이라고 쓰여 있어도, 그중 7명만 확진 일자가 오늘이라면, 나머지 1명은 미포함했습니다<br></br>
하지만 공지드렸음에도 불구하고 그 이후로 많은 분들이 왜 재난 문자랑 숫자가 다르냐 하시며 문의를 지속적으로 보내셔서 운영의 어려움이 있습니다 그러므로 일단은 기존 방식인 재난 문자에서 제공되는 확진자 명수로 집계를 하겠습니다<br></br>
혼란을 방지하기 위해 어제 비교 그래프와 어제 비교 수치는 내일부터 다시 제공됩니다<br></br>
금일(29일) 13시부터 적용합니다
`;

const CHART_PRIMARY_COLOR = `#5673EB`;
const CHART_SECONDARY_COLOR = `#999999`;
export const LineChartConfig: ChartData<Chart.ChartData> = {
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

export const C_TOTAL = 0;
export const C_DELTA = 1;
