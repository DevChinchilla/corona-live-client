import DomesticUpdatesModal from "@components/Domestic/DomesticUpdatesModal";
import { Page } from "@components/Layout";
import React from "react";

const DomesticLive = ({ data }) => {
  const { updatesData } = data;
  if (!updatesData) return <></>;
  return (
    <Page>
      <DomesticUpdatesModal data={updatesData} show={true}></DomesticUpdatesModal>
    </Page>
  );
};

export default DomesticLive;
