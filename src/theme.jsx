const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // light mode palette values
        }
      : {
          // dark mode palette values
        }),
  },
});

export { getDesignTokens };
