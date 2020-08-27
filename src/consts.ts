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

export const TWITTER_SNS_URL = `https://twitter.com/kCm2v4r1PvpSE7A`;
export const INSTA_SNS_URL = `https://www.instagram.com/corona.live.kr/`;

export const EMAIL_API = `https://64t2pyuhje.execute-api.ap-northeast-2.amazonaws.com/corona-live-email`;

export const IMPORTANT_MESSAGE = `
<strong>이용 전 필독 부탁드립니다.부탁드립니다</strong><br><br> 1.  코로나 라이브는 재난 문자와 각 지자체 및 질병관리본부에서 금일 제공하는 공식적인 자료를
기반으로 코로나 현황을 실시간으로 제공 하고 있습니다..<br><br> 2.  <strong>오늘 확진 판정받은</strong> 확진자분들만 오늘발생 확진자분들만 오늘 발생 확진자로 포함합니다. (당일 확진자 발생 재난 문자가 와도 어제 확진 판정된 확진자는 미포함합니다).<br><br> 3. 몇몇 지자체에서는 당일 확진 판정받은 확진자를 다음날 공개를 하여 이럴 경우 코로나 라이브에 오늘 수치로 <strong>반영이 안 됩니다</strong>. 검역 또한 반영이 안 됩니다.<br><br>4. 이와같은경우로 다음날 제공하는 질본 수치와 <strong> 오차가 발생할 수 있습니다</strong> <br><br>5. 민간이 취합한 집계이므로 공식적인 근거 자료로 활용될 수 없습니다.
<br><br>  6. 본 사이트에서 제공하는 정보 사용/공유로 인해 발생한 문제의 책임은<strong>
전적으로 사용자에게 있습니다.</strong>
<br><br>정보 오류나 누락 발견 시 제보하여주시기 바랍니다.
`;
