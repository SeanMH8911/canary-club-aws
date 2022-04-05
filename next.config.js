const path = require("path");
module.exports = {
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "https://canaryclub0dbc3d9511ea40f6928b22162c07fbf1133456-dev.s3.eu-west-2.amazonaws.com/",
    ],
  },
};
