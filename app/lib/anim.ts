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
      delay: (index % 3) * 0.2,
    },
  },
});

export const sidebarBackgroundVariants = {
  hidden: {
    opacity: 0,
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
    x: 600,
    opacity: 0,
    transition: {
      duration: 0.4,
      opacity: {
        duration: 0.6,
      }
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      damping: 15,
      stiffness: 200 ,
      ease: "easeInOut",
    },
  },
};
