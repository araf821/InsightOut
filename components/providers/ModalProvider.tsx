'use client'

import { useEffect, useState } from "react";
import FollowersModal from "../modal/FollowersModal";

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
    </>
  );
};

export default ModalProvider;
