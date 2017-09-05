const path = require("path");
const escape = require("escape-string-regexp");
const blacklist = require("react-native/packager/blacklist");

module.exports = {
    getProjectRoots() {
        return [
            path.join(__dirname, '..', '..', '..', 'source'),
            __dirname
        ];
    },
    getProvidesModuleNodeModules() {
        return ["react-native", "react"];
    },
    getBlacklistRE() {
        return blacklist([
            new RegExp(
                `^${escape(path.resolve(__dirname, '..', '..', '..', 'source', 'node_modules'))}\\/.*$`
            )
        ]);
    }
};
