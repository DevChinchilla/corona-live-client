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

// export const IMPORTANT_MESSAGE = `

// 1.  코로나 라이브는 재난 문자와 각 지자체 및 질병관리본부에서 금일 제공하는 공식적인 자료를
// 기반으로 코로나 현황을 실시간으로 제공 하고 있습니다.<br><br> 2. <strong>오늘 확진 판정받은</strong> 확진자분들만 오늘 발생 확진자로 포함합니다. 당일 확진자 발생 재난 문자가 와도 어제 확진 판정된 확진자는 미포함합니다.<br><br> 3. 몇몇 지자체에서는 당일 확진 판정받은 확진자를 다음날 공개를 하여 이럴 경우 코로나 라이브에 <strong>반영이 안 됩니다</strong> (해외유입 / 검역은 반영 안 됩니다).<br><br> 4. 이와같은경우로 다음날 제공하는 질본 수치와 <strong> 오차가 발생할 수 있습니다</strong> <br><br>5. 민간이 취합한 집계이므로 공식적인 근거 자료로 활용될 수 없습니다.
// <br><br>  6. 본 사이트에서 제공하는 정보 사용/공유로 인해 발생한 문제의 책임은<strong>
// 전적으로 사용자에게 있습니다.</strong> <br><br>
// <br><br>정보 오류나 누락 발견 시 제보하여주시기 바랍니다.
// `;

// 코로나 라이브는 재난 문자와 각 지자체 및 질병관리본부에서 금일 제공하는 공식적인 자료를 기반으로 당일 확진 판정받은 확진자 현황을 제공 하고 있습니다. <br><br>
export const IMPORTANT_MESSAGE = `
코로나 라이브는 질본 집계방식과 동일하게 <strong>전일 0시부터 당일 0시까지</strong>의
  기준으로 확진자 수를 집계하지만 다음날 발표되는 질본 수치와 <strong> 오차가 발생할 수 있습니다</strong>  <br><br>
<strong>코로나 라이브에 집계가 안되는 경우</strong>  <br><br>
<ol>
<li>
 검역 확진자는 알 수 있는 경로가 없습니다 
</li>
<li>
 대구는 당일 확진자 수, 정보를 다음날 공식적으로 공개해서 집계를 못합니다 
</li>
<li>
늦은 시간 판정받은 확진자는 다음날 재난 문자를 보내지만, 이경우 질본의 당일 포함 여부를 알 수가 없어 집계에 미포함됩니다 
</li>
<li>
질본수치에 전일 확진자가 집계될 경우 (이 경우는 3번과 같이 늦은 시간 판정받은 확진자가 발생할떄입니다)
</li>
</ol>
이와같은경우로 다음날 제공하는 질본 수치와 <strong> 오차가 발생할 수 있습니다</strong> <br>
*민간이 취합한 집계이므로 공식적인 근거 자료로 활용될 수 없습니다 <br>
*사이트에서 제공하는 정보 사용/공유로 인해 발생한 문제의 책임은<strong>
전적으로 사용자에게 있습니다.</strong> <br>

`;
