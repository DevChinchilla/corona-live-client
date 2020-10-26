import { Page } from "@components/Layout";
import UpdateModal from "@components/UpdateModal";
import { sortByDate } from "@utils";
import React from "react";
import { useHistory } from "react-router-dom";

const DomesticLive = ({ data }) => {
  const history = useHistory();
  const { updatesData } = data;
  if (!updatesData) return <></>;
  return (
    <Page>
      <UpdateModal
        isDistrict={false}
        {...{
          onClose: () => {
            history.push({ pathname: "/", state: "live" });
          },
          showUpdates: true,
          data: sortByDate(updatesData),
        }}
      ></UpdateModal>
    </Page>
  );
};

export default DomesticLive;
