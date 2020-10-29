import React from "react";
import UpdateModal from "@components/Updates/UpdatesModal";
import { ct, getDomesticUpdates } from "@utils";
import { useHistory } from "react-router-dom";
import { UNAVALIABLE_REGIONS } from "@consts";

type Props = {
  data: any;
  show: boolean;
  onClose?: any;
  cityId?: string;
  guId?: string;
};

const DomesticUpdatesModal: React.FC<Props> = ({ data, show, onClose, cityId, guId }) => {
  const history = useHistory();
  if (!data) return <></>;

  return (
    <UpdateModal
      onClose={() => (onClose ? onClose() : history.push({ pathname: "/", state: "live" }))}
      data={getDomesticUpdates(data, cityId, guId)}
      showModal={show}
      showCasesSummary
      showFilters={cityId == undefined && guId == undefined}
      areaName={ct(cityId, guId)}
      portal={guId != undefined || UNAVALIABLE_REGIONS[ct(cityId)]}
    ></UpdateModal>
  );
};

export default DomesticUpdatesModal;
