const Animations = {
  container: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  fadeIn: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
  slideXfadeIn: {
    hidden: {
      x: 20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
  },
  slideYfadeIn: {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.01,
      },
    },
  },
  extendX: {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 1 },
    },
  },
  extendY: {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 1 },
    },
  },
};

export default Animations;
