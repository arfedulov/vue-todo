
export const logger = (level) => {
  switch (level) {
    case 'info':
      return console.info;
    case 'warn':
      return console.warn;
    case 'error':
      return console.error;
    default:
      return () => {};
  }
};

export default logger;
