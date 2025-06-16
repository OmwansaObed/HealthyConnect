"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/api/userSlice";

const useSyncSessionToRedux = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(setUser(session.user));
    }
  }, [status, session, dispatch]);
};

export default useSyncSessionToRedux;
