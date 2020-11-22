import React, { useCallback, useMemo } from "react";
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

  const onCloseModal = useCallback(
    () => (onClose ? onClose() : history.push({ pathname: "/", state: "live" })),
    []
  );

  const updatesData = useMemo(() => getDomesticUpdates(data, cityId, guId), [data, cityId, guId]);
  const areaName = useMemo(() => ct(cityId, guId), [cityId, guId]);

  return (
    <UpdateModal
      onClose={onCloseModal}
      data={updatesData}
      showModal={show}
      showCasesSummary
      showFilters={cityId == undefined && guId == undefined}
      areaName={areaName}
      portal={guId != undefined || UNAVALIABLE_REGIONS[ct(cityId)]}
    ></UpdateModal>
  );
};

export default DomesticUpdatesModal;
