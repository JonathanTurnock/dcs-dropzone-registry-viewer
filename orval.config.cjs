module.exports = {
  registry: {
    input: "https://dcs-mod-manager-registry.pages.dev/schema.json", // Get this locally by running dev in the https://github.com/flying-dice/dcs-dropzone-registry repo
    output: {
      target: "src/_autogen/client.ts",
      client: "react-query",
      baseUrl: "https://dcs-mod-manager-registry.pages.dev",
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
};
