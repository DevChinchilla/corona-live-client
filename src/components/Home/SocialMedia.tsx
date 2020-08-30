import * as React from "react";
import { TWITTER_SNS_URL, INSTA_SNS_URL } from "@consts";
import { Row } from "@components/Layout";
import { IconBox } from "./IconBox";
import Icon from "@components/Icon";

type Props = {};

const SocialMedia: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <>
      <Row fontSize="10px" mb="16px" mt="12px" opacity={0.5} jc="center" width="100%">
        코로나 라이브 SNS로 보기
      </Row>
      <Row jc="center" position="relative">
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
