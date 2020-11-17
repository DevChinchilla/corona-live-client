import React from "react";
import UpdateModal from "@components/Updates/UpdatesModal";
import { getWorldUpdates } from "@utils";
import { useHistory } from "react-router-dom";
import { COUNTRY_NAMES } from "@consts";

type Props = {
  data: any;
  show: boolean;
  onClose?: any;
  countryCode?: string;
};

const WorldUpdatesModal: React.FC<Props> = ({ data, show, onClose, countryCode }) => {
  const history = useHistory();
  if (!data) return <></>;

  return (
    <UpdateModal
      onClose={() => (onClose ? onClose() : history.push({ pathname: "/world", state: "live" }))}
      data={getWorldUpdates(data, countryCode)}
      showModal={show}
      showFilters={false}
      areaName={countryCode == undefined ? "세계" : COUNTRY_NAMES[countryCode]}
      hideSrc
    ></UpdateModal>
  );
};

export default WorldUpdatesModal;
