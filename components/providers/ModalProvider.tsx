"use client";

import { useEffect, useState } from "react";
import FollowersModal from "../modal/FollowersModal";
import FollowingModal from "../modal/FollowingModal";

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
    </>
  );
};

export default ModalProvider;
