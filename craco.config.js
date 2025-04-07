module.exports = {
  webpack: {
    configure: {
      devtool: "source-map",
      output: {
        devtoolModuleFilenameTemplate: (info) => {
          return `file:///${info.absoluteResourcePath.replace(/\\/g, "/")}`;
        },
      },
    },
  },
};
