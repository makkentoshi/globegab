import { cn } from "@/lib/utils";
import {
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("speaker-left");

  const [showParticipants, setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout></PaginatedGridLayout>;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left"></SpeakerLayout>;

      default:
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right"></SpeakerLayout>;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout></CallLayout>
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] ml-2 hidden", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList
            onClose={() => setShowParticipants(false)}
          ></CallParticipantsList>
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
