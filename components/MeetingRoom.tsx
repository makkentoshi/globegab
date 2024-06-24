"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const router = useRouter();
  const call = useCall();

  const MyParticipantList = () => {
    const { useParticipants } = useCallStateHooks();
    const participants = useParticipants();
    return (
      <>
        <h2>Participants</h2>
        {participants.map((participant) => (
          <div key={participant.sessionId}>
            <Image
              src={participant.image}
              alt={`Profile picture of ${participant.name}.`}
            />
            <span>{participant.name}</span>
          </div>
        ))}
      </>
    );
  };

 

  useEffect(() => {
    if (!call) {
      router.push(`/`);
    }
  }, [call, router]);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls onLeave={() => router.push(`/`)} />
      </div>
    </section>
  );
};

export default MeetingRoom;
