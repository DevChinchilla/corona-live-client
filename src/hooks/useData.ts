import { useEffect, useState } from "react";
import useSWR from "swr";

import { API_ROOT, SECOND } from "@consts";
import { fetcher, getCasesSummary, jsonCompare } from "@utils";
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
  const [lastUpdated, setLastUpdated] = useState(0);
  const [timeseries, setTimeseries] = useObjectState<TimeseriesState>({
    data: null,
    loading: false,
  });

  const removeNotification = () => setNotification(null, true);

  const isInitialised = stats.data != null && updates.data != null;

  const onUpdatesFetched = (newUpdates: UpdateType[]) => {
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
        obj[city] = obj[city] ? obj[city] + Number(cases) : Number(cases);
        addedCases += Number(cases);
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
    `https://apiv2.corona-live.com/updates.json`,
    fetcher,
    {
      refreshInterval: SECOND * 100,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      onSuccess: onUpdatesFetched,
    }
  );

  const { mutate: mutateStats, isValidating: statsLoading } = useSWR(
    `https://apiv2.corona-live.com/stats.json`,
    fetcher,
    {
      refreshInterval: SECOND * 100,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      onSuccess: onStatsFetched,
    }
  );

  // const { mutate: mutateTimeseries } = useSWR(`${API_ROOT}/timeseries.json`, fetcher, {
  const { mutate: mutateTimeseries, isValidating: timeseriesLoading } = useSWR(
    `https://apiv2.corona-live.com/timeseries.json`,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      onSuccess: onTimeseriesFetched,
    }
  );

  const mutateData = async () => {
    setStats({ loading: true });
    setUpdates({ loading: true });

    mutateUpdates();
    mutateStats();

    let currentHours = new Date().getHours();
    let currentMinutes = new Date().getMinutes();
    if (currentHours == 9 && currentMinutes > 30) {
      mutateTimeseries();
    }
  };

  useSWR(`https://apiv2.corona-live.com/notifier.json`, fetcher, {
    revalidateOnReconnect: true,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    refreshInterval: SECOND * 6,
    onSuccess: (newLastUpdated) => {
      if (lastUpdated && lastUpdated != newLastUpdated) {
        mutateData();
      }
      setLastUpdated(newLastUpdated);
    },
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

  useEffect(() => {
    if (!timeseries.data && !timeseriesLoading) mutateTimeseries();
    if (!updates.data && !updatesLoading) mutateUpdates();
    if (!stats.data && !statsLoading) mutateStats();
  }, [timeseries, updates, stats]);

  const isLoading = updates.loading;
  const casesSummary = updates.data ? getCasesSummary(updates.data) : null;

  return {
    casesSummary,
    updatesData: updates.data,
    statsData: stats.data,
    timeseriesData: timeseries.data,
    mutateData,
    isLoading,
    notification,
    removeNotification,
  };
};
