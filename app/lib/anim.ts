export const cardContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const postCardVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
});

export const sidebarBackgroundVariants = {
  hidden: {
    opacity: 1,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(4px)",
    transition: {
      duration: 0.4,
    },
  },
};

export const sidebarVariants = {
  hidden: {
    x: 769,
    transition: {
      duration: 0.6,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 20,
      stiffness: 200,
      ease: "easeInOut",
    },
  },
};

export const singlePostVariants = {
  hidden: {
    scaleX: 0.3,
    y: 300,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
    ease: "cubic-bezier( .42, 0, 0.93, 0.18 )",
  },
};
