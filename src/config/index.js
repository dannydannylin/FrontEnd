const path = require('path')
module.exports = {
    dev: {
        env: require('./dev.env')
    },
    prod: {
        env: require('./prod.env'),
    },
    docker: {
        env: require('./docker'),
    }
}