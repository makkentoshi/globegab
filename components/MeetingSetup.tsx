"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicToggledOn, setIsMicToggledOn] = useState(false);
  const [isCamToggledOn, setIsCamToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall");
  }

  useEffect(() => {
    if (isMicToggledOn) {
      call?.microphone.disable();
    } else {
      call?.microphone.enable();
    }

    if (isCamToggledOn) {
      call?.camera.disable();
    } else {
      call?.camera.enable();
    }
  }, [isMicToggledOn, isCamToggledOn, call?.camera, call?.microphone]);

  const { useCallSettings } = useCallStateHooks();
  const { useCameraState } = useCallStateHooks();
  const { hasBrowserPermission } = useCameraState();

  const settings = useCallSettings();
  console.log(settings?.video.camera_default_on);


  if (hasBrowserPermission) {
    console.log('User has granted camera permissions!');
  } else {
    console.log('User has denied or not granted camera permissions!');
  }
  

  const { camera, selectedDevice, devices, mediaStream } = useCameraState();
  const preferredDevice = devices.find((d) => d.label === 'My Camera');

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-white gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview></VideoPreview>

      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex justify-center gap-2 font-medium items-center">
          <input
            type="checkbox"
            checked={isMicToggledOn}
            onChange={(e) => setIsMicToggledOn(e.target.checked)}
          ></input>
          Microphone
          <input
            type="checkbox"
            checked={isCamToggledOn}
            onChange={(e) => setIsCamToggledOn(e.target.checked)}
          ></input>
          Camera
        </label>

        <DeviceSettings></DeviceSettings>
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join;

          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
