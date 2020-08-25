import { useEffect } from "react";
const Kakao = window["Kakao"];

export const useKakaoButton = () => {
  useEffect(() => {
    Kakao.Link.createDefaultButton({
      container: "#kakaoShare",
      objectType: "feed",
      content: {
        title: "코로나 라이브 | 실시간 코로나 현황",
        description: "오늘 코로나 확진자 발생 정보를 실시간으로 제공합니다",
        imageUrl: "https://corona-live.com/thumbnail.png",
        link: {
          mobileWebUrl: "https://corona-live.com",
          androidExecParams: "test",
        },
      },
      social: {
        likeCount: 5394,
        commentCount: 302,
        sharedCount: 4690,
      },
      buttons: [
        {
          title: "실시간 현황 보기",
          link: {
            mobileWebUrl: "https://corona-live.com",
          },
        },
      ],
    });
  }, []);
};