export const poppingTransition = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};
