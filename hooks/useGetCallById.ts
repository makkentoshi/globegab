import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) return;

    const fetchCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id,
          },
        });
        if (calls.length > 0) setCall(calls[0]);
        if (!calls) throw new Error("Failed to get call");
      } catch (error) {
        console.error(error);
      } finally {
        setIsCallLoading(false);
      }
    };

    fetchCall();
  }, [client, id]);

  return { call, isCallLoading };
};
