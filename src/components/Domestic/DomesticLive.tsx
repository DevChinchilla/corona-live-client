import DomesticUpdatesModal from "@components/Domestic/DomesticUpdatesModal";
import { Page } from "@components/Layout";
import { Helmet } from "react-helmet";
import React from "react";
import Meta from "@components/Meta";

const DomesticLive = ({ data }) => {
  const { updatesData } = data;
  if (!updatesData) return <></>;
  return (
    <Page>
      <Meta
        data={{
          title: `코로나 라이브 | 국내 확진자 현황`,
          canonical: `live`,
          description: `당일 발생 국내 환진자 현황을 실시간으로 제공합니다`,
        }}
      ></Meta>
      <DomesticUpdatesModal data={updatesData} show={true}></DomesticUpdatesModal>
    </Page>
  );
};

export default DomesticLive;
