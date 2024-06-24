"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import {
  StreamCall,
  StreamTheme,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoaded, user } = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  const client = useStreamVideoClient();

  if (!isLoaded || isCallLoading) return <Loader></Loader>;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup
              setIsSetupComplete={setIsSetupComplete}
            ></MeetingSetup>
          ) : (
            <MeetingRoom></MeetingRoom>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
