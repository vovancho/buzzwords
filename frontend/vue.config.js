const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/buzzwords/docs/" : "/",
  outputDir: "../docs",
  devServer: {
    host: "0.0.0.0",
    hot: true,
    client: {
      overlay: true,
      webSocketURL: {
        hostname: "0.0.0.0",
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
});
