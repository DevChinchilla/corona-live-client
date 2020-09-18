import { useEffect } from "react";
import useSWR from "swr";

import { API_ROOT, SECOND } from "@consts";
import { fetcher, jsonCompare } from "@utils";
import { StatsType, UpdateType, NotificationType } from "@types";
import { useObjectState } from "@hooks/useObjectState";

interface StatsState {
  data: StatsType | null;
  loading: boolean;
}
interface UpdatesState {
  data: UpdateType[] | null;
  loading: boolean;
}

interface TimeseriesState {
  data: any;
  loading: boolean;
}

export const useData = () => {
  const [notification, setNotification] = useObjectState<NotificationType | null>(null);
  const [stats, setStats] = useObjectState<StatsState>({ data: null, loading: false });
  const [updates, setUpdates] = useObjectState<UpdatesState>({ data: null, loading: false });
  const [timeseries, setTimeseries] = useObjectState<TimeseriesState>({
    data: null,
    loading: false,
  });

  const removeNotification = () => setNotification(null, true);

  const isInitialised = stats.data != null && updates.data != null;

  const onUpdatesFetched = (newUpdates: UpdateType[]) => {
    // newUpdates[0].cases = null;
    // newUpdates[0].total = 2;
    // newUpdates[1].cases = null;
    console.log(newUpdates);
    if (!jsonCompare(updates.data, newUpdates)) setUpdates({ data: newUpdates });

    const newCases = newUpdates.filter(
      (newUpdate) =>
        !updates.data?.find((oldUpdate) => {
          return newUpdate.datetime == oldUpdate.datetime;
        })
    );

    if (newCases.length > 0 && isInitialised) {
      let addedCases = 0;

      const casesCountByCity = newCases.reduce((obj, { city, cases }) => {
        obj[city] = obj[city] ? obj[city] + cases : cases;
        addedCases += cases;
        return obj;
      }, {});

      if (addedCases > 0) setNotification({ casesCountByCity, addedCases });
      setUpdates({ data: newUpdates });
    }
  };

  const onStatsFetched = (newStats: StatsType) => {
    if (!jsonCompare(stats.data, newStats)) setStats({ data: newStats });

    const [prevCases, prevDelta] = stats.data?.overview?.current || [0, 0];
    const [newCases, newDelta] = newStats?.overview?.current || [0, 0];

    const isChanged =
      prevCases != newCases ||
      prevDelta != newDelta ||
      newStats.announcements.length != stats.data?.announcements.length;

    if (isChanged && isInitialised) {
      setStats({ data: newStats });
    }
  };

  const onTimeseriesFetched = (newTimeseries) => {
    setTimeseries({ data: newTimeseries });
  };

  const { mutate: mutateUpdates, isValidating: updatesLoading } = useSWR(
    `${API_ROOT}/updates.json`,
    fetcher,
    {
      refreshInterval: SECOND * 20,
      revalidateOnReconnect: true,
      revalidateOnMount: false,
      onSuccess: onUpdatesFetched,
    }
  );

  const { mutate: mutateStats } = useSWR(`${API_ROOT}/stats.json`, fetcher, {
    refreshInterval: SECOND * 20,
    revalidateOnReconnect: true,
    revalidateOnMount: false,
    onSuccess: onStatsFetched,
  });

  useSWR(`${API_ROOT}/timeseries.json`, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    onSuccess: onTimeseriesFetched,
  });

  useEffect(() => {
    if (updatesLoading == true) {
      setUpdates({ loading: !!notification ? false : true });
    } else {
      setTimeout(() => {
        setUpdates({ loading: updatesLoading });
      }, 2000);
    }
  }, [updatesLoading]);

  const mutateData = async () => {
    setStats({ loading: true });
    setUpdates({ loading: true });

    mutateUpdates();
    mutateStats();
  };

  const isLoading = updates.loading;

  useEffect(() => {
    if (!isInitialised && !isLoading) mutateData();
  }, [isInitialised]);

  return {
    updatesData: updates.data,
    statsData: stats.data,
    timeseriesData: timeseries.data,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  };
};
