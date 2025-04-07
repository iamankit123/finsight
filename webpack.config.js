module.exports = {
  devtool: "source-map",
  output: {
    devtoolModuleFilenameTemplate: (info) => {
      // Use absolute paths for better error reporting
      return info.absoluteResourcePath;
    },
  },
};
