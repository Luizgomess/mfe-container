const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: "portal",
  filename: "remoteEntry.js",
  remotes: {
    "extcompanies": "https://external-companies-git-master-luizgomess-projects.vercel.app/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
