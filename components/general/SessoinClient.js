// /components/general/SessionSyncClient.jsx
"use client";

import useSyncSessionToRedux from "../../hooks/useSyncSessionToRedux";

const SessionSyncClient = () => {
  useSyncSessionToRedux();
  return null;
};

export default SessionSyncClient;
