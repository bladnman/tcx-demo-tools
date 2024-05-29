import { useEffect, useState } from 'react';

export default function useMerlinData(isActive: boolean) {
  const MERLIN_ENDPOINT_URL = 'http://localhost:3005/merlin/query';

  const [activateDate, setActivateDate] = useState<number | null>(
    isActive ? Date.now() : null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    if (isActive && !activateDate) {
      setActivateDate(Date.now());
    } else if (!isActive && activateDate) {
      setActivateDate(null);
    }
  }, [activateDate, isActive]);

  useEffect(() => {
    if (activateDate) {
      setIsLoading(true);

      const sqlQuery = getTableDataQuery(
        // `p1np_telemetry_client_applicationerror`,
        `p1np_telemetry_client_interaction`,
        '62a7be3288dbaa631c05e3914f6a8d703c96eedaeada151bbb95571d6dcd044f',
        5,
      );

      fetch(MERLIN_ENDPOINT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sqlQuery,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    }
  }, [activateDate]);

  return { isLoading, data };
}

function getTableDataQuery(table: string, openPsId: string, numberOfHours: number) {
  return `
    SELECT * from ${table}
    WHERE
      "__time" >= CURRENT_TIMESTAMP - INTERVAL '${numberOfHours ?? 1}' HOUR
      and openPsid = '${openPsId}' 
  `;
}
