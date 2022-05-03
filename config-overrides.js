module.exports = function override(config, env) {
    // New config, e.g. config.plugins.push...
    config.externals = { "sequelize": "require('sequelize')" };
    return config
}
