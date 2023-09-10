"use client";

import { useEffect, useState } from "react";
import FollowersModal from "../modal/FollowersModal";
import FollowingModal from "../modal/FollowingModal";
import ProfileSettingsModal from "../modal/ProfileSettingsModal";

const ModalProvider = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FollowersModal />
      <FollowingModal />
      <ProfileSettingsModal />
    </>
  );
};

export default ModalProvider;
