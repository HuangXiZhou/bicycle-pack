let baseTool = require("../tools/base");
let webpack = require("webpack");
let ora = require("ora");

process.wpOption.env = "build";

function webpackBuild(webpackConfig) {
  return new Promise((resolve, reject) => {
    let spinner = ora("building for production...");
    spinner.start();

    webpack(webpackConfig, (err, status) => {
      spinner.stop();
      resolve(status);
    });
  });
}

async function build() {
  require("./tools/rmDist");
  let webpackConfig = require("../webpack/webpack.config.prod");
  delete webpackConfig.devtool;
  await webpackBuild(webpackConfig);
}

build();
