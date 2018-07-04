var express = require('express');

function getRoutes(path, layer) {
    if (layer.route) {
        layer.route.stack.forEach(getRoutes.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(getRoutes.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
        var route = {
            method: layer.method.toUpperCase(),
            path: "/" + path.concat(split(layer.regexp)).filter(Boolean).join('/')
        };
        return process.env.routes += JSON.stringify(route) + ",";
    }
}

function split(item) {
    if (typeof item === 'string') {
        return item.split('/')
    } else if (item.fast_slash) {
        return ''
    } else {
        var match = item.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
        return match ?
            match[1].replace(/\\(.)/g, '$1').split('/') :
            '<complex:' + item.toString() + '>'
    }
}

function routes(routeName) {
    routeName = routeName || 'api-test';
    var router = express.Router();

    router.get('/'+routeName, function(req, res) {
        process.env.routes = "[";
        req.app._router.stack.forEach(getRoutes.bind(null, []));
        process.env.routes = process.env.routes.substring(0, process.env.routes.length - 1) + "]";
        var routemap = {
            platform: [],
            api: []
        };
        var routes = JSON.parse(process.env.routes);
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            if (route.path.indexOf('sys') !== -1 || route.path.indexOf('mbaas') !== -1) {
                routemap.platform.push(route);
            } else if (route.path.indexOf(routeName) !== 0) {
                routemap.api.push(route);
            }
        }

        return res.json(routemap);
    });


    return router;
}

module.exports = routes;
