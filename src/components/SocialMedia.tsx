import * as React from "react";
import { TWITTER_SNS_URL, INSTA_SNS_URL } from "@consts";
import { Row } from "@components/Layout";
import { IconBox } from "@components/IconBox";
import Icon from "@components/Icon";

type Props = {
  hideTitle?: boolean;
};

const SocialMedia: React.FC<Props> = ({ hideTitle }) => {
  return (
    <>
      {!hideTitle && (
        <Row
          fontSize="10px"
          minHeight="30px"
          opacity={0.5}
          jc="center"
          ai="center"
          width="100%"
          flexShrink={0}
        >
          코로나 라이브 SNS로 보기
        </Row>
      )}

      <Row jc="center" position="relative" flexShrink={0} minHeight="60px">
        <IconBox type="twitter" href={TWITTER_SNS_URL}>
          <Icon name="Twitter" size={14}></Icon>
        </IconBox>
        <IconBox type="instagram" href={INSTA_SNS_URL}>
          <Icon name="Instagram" size={14}></Icon>
        </IconBox>
      </Row>
    </>
  );
};

export default SocialMedia;
