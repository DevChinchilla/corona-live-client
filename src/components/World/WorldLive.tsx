import React from "react";
import { Page } from "@components/Layout";
import { Helmet } from "react-helmet";

import WorldUpdatesModal from "@components/World/WorldUpdatesModal";
import { WorldOverviewType } from "@types";

type Props = {
  data: { worldOverview: WorldOverviewType };
};

const WorldLive: React.FC<Props> = ({ data }) => {
  const { worldOverview } = data;
  if (!worldOverview) return <></>;
  return (
    <Page>
      <Helmet>
        <title>코로나 라이브 | 실시간 발생 국내 확진자</title>
        <link rel="canonical" href="https://corona-live.com/live" />
      </Helmet>

      <WorldUpdatesModal data={worldOverview.updates} show={true}></WorldUpdatesModal>
    </Page>
  );
};

export default WorldLive;
