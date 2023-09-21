import React from "react";

function Chatbar() {
  return (
    <button
      className="chatTrigger button button--icon u-borderGreyBlue u-borderBottomNone u-boxShadow js-intercom"
      data-ja-track-link="Clicked Start a Chat"
      data-ja-source="global_chat_trigger"
      tabIndex="0"
      aria-label="chat"
    >
      <sg-icon icon="chat" className="icon"></sg-icon>
      <span className="u-showForSROnly">Chat</span>
    </button>
  );
}

export default Chatbar;
