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
