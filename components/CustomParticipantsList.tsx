import React from "react";
import {
  StreamVideoParticipant,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import Image from "next/image";

const CustomParticipantsList = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  if (!participants || participants.length === 0) {
    return <div>No participants</div>;
  }

  return (
    <div className="participants-list">
      {participants.length === 0 ? (
        <div>No participants</div>
      ) : (
        participants.map((participant: StreamVideoParticipant) => (
          <div key={participant.userId} className="participant">
            {participant.image ? (
              <Image
                src={participant.image}
                alt={`${participant.name}'s avatar`}
                className="participant-avatar"
              />
            ) : (
              <div className="participant-placeholder">
                {participant.name.charAt(0)}
              </div>
            )}
            <span>{participant.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomParticipantsList;
