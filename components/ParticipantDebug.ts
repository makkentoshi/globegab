import React, { useEffect } from "react";
import { useCallStateHooks } from '@stream-io/video-react-sdk';

const ParticipantsDebug = () => {

  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  useEffect(() => {
   
  }, [participants]);

  return null;
};

export default ParticipantsDebug;