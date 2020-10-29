import DomesticUpdatesModal from "@components/Domestic/DomesticUpdatesModal";
import { Page } from "@components/Layout";
import { Helmet } from "react-helmet";
import React from "react";

const DomesticLive = ({ data }) => {
  const { updatesData } = data;
  if (!updatesData) return <></>;
  return (
    <Page>
      <Helmet>
        <title>코로나 라이브 | 실시간 발생 국내 확진자</title>
        <link rel="canonical" href="https://corona-live.com/live" />
      </Helmet>

      <DomesticUpdatesModal data={updatesData} show={true}></DomesticUpdatesModal>
    </Page>
  );
};

export default DomesticLive;
