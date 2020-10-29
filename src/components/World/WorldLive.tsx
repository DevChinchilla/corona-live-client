import React from "react";
import { Page } from "@components/Layout";

import WorldUpdatesModal from "@components/World/WorldUpdatesModal";
import { WorldOverviewType } from "@types";
import Meta from "@components/Meta";

type Props = {
  data: { worldOverview: WorldOverviewType };
};

const WorldLive: React.FC<Props> = ({ data }) => {
  const { worldOverview } = data;
  if (!worldOverview) return <></>;
  return (
    <Page>
      <Meta
        data={{
          title: `코로나 라이브 | 세계 확진자 현황`,
          canonical: `world/live`,
          description: `당일 발생 세계 환진자 현황을 실시간으로 제공합니다`,
        }}
      ></Meta>

      <WorldUpdatesModal data={worldOverview.updates} show={true}></WorldUpdatesModal>
    </Page>
  );
};

export default WorldLive;
