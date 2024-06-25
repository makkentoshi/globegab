"use client";
//FIXED
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  ParticipantView,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Users, LayoutList } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ParticipantsDebug from "./ParticipantDebug";
import CustomParticipantsList from "./CustomParticipantsList";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();
  const router = useRouter();
  const call = useCall();

  const MyCallUI = () => {
    return (
      <>
        {participants.map((p) => (
          <ParticipantView participant={p} key={p.sessionId} />
        ))}
      </>
    );
  };

  const CustomParticipantsList = () => {
    const participants = useParticipants();

    if (!participants || participants.length === 0) {
      return <div>No participants</div>;
    }
  };

  useEffect(() => {
    if (!call) {
      router.push(`/`);
    }
  }, [call, router]);

  const CallLayout = () => {
    if (layout === "grid") {
      return <PaginatedGridLayout />;
    } else if (layout === "speaker-right") {
      return <SpeakerLayout participantsBarPosition="left" />;
    } else {
      return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className=" flex size-full max-w-[1000px] items-center">
          <CustomParticipantsList />
          <ParticipantsDebug></ParticipantsDebug>
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
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
};

export default MeetingRoom;
