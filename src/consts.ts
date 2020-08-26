export const TODAY_API_ROOT = "https://api.coronamap.live/today.json";
export const API_ROOT = "https://api.corona-live.com/";
// export const API_ROOT = "https://devchinchilla.github.io/corona-live-api-v2/";
export const CITY_TD_FLEX = ["0.45", "0.2", "1.3", "1", "0 1 80px"];
export const DISTRICT_TD_FLEX = ["0.7", "0.25", "1", "1", "0 1 80px"];
export const CITY_IDS = [...Array(16).keys()];

export const WEBSITE_URL = `https://corona-live.com`;
export const FACEBOOK_URL = `https://www.facebook.com/sharer/sharer.php?u=${WEBSITE_URL}%2F&amp;src=sdkpreparse`;
export const BLOG_URL = `http://blog.naver.com/openapi/share?url=${WEBSITE_URL}&title=[코로나 라이브] 코로나 현황 실시간으로 보기`;
export const TWITTER_URL = `http://twitter.com/share?url=${WEBSITE_URL}&text=코로나 현황 실시간으로 보기`;

export const EMAIL_API = `https://64t2pyuhje.execute-api.ap-northeast-2.amazonaws.com/corona-live-email`;

export const IMPORTANT_MESSAGE = `
코로나 라이브는 재난문자와 각 지자체및 질병관리본부에서 <strong>금일 제공하는 자료</strong>를
기반으로 코로나 현황을 실시간으로 제공 하고있습니다 <br><br> 하지만 민간이 취합한 집계이므로 공식적인
근거 자료로 활용될수 없고, 본사이트에서 제공하는 오늘 확진자수는 다음날 제공하는 질본 수치와 <strong> 오차가 발생할수 있습니다</strong>
<br><br>  본사이트에서 제공하는 정보 사용/공유로 인해 발생된 문제의 책임은<strong>
전적으로 사용자에게 있습니다.</strong>
<br><br>정보 오류나 누락 발견시 제보하여주시기 바랍니다
`;
