module.exports = function (config) {
    "use strict";
    var ENUMS = require('./enums'),
        serverRequest = require('request');

    function queryServer(req, res, next) {
        var options = {
            url: 'http://localhost:9091/transmission/rpc',
            method: 'POST',
            headers: {
                'x-transmission-session-id': null
            },
            body: JSON.stringify(req.transmission)
        };

        function queryCallback(error, response, body) {
            if (error) {
                console.log('error');
                if (error.code === ENUMS.error.connection) {
                    console.log('not found');
                    return res.status(404).json({
                        error: true,
                        code: ENUMS.error.connection,
                        message: 'Unable to connect to transmission.  check that its running before modifying the configuration'
                    });
                }

                // determine what errors go here
                res.transmission.error = JSON.stringify(error);
                return next();
            }

            if (response.statusCode === 409) {
                options.headers['x-transmission-session-id'] = response.headers['x-transmission-session-id'];
                return serverRequest(options, queryCallback);
            }


            console.log((response) ? response.statusCode : 'no response');
            res.transmission = JSON.parse(body);

            return next();
        }

        res.transmission = {};
        serverRequest(options, queryCallback);
    }

    function sessionMethod(req, res, next) {
        var method = ENUMS.session[req.method];
        if (method) {
            req.transmission = {
                method: method
            };
            return next();
        }
        return res.statusCode(403).json({
            statusCode: 403,
            error: 'method not supported',
            method: req.method,
            path: req.path
        });
    }

    function torrentsMethod(req, res, next) {
        var method = ENUMS.torrents[req.method];
        if (method) {
            req.transmission = {
                method: method
            };
            return next();
        }
        return res.statusCode(403).json({
            statusCode: 403,
            error: 'method not supported',
            method: req.method,
            path: req.path
        })
    }

    function torrentsArguments(req, res, next) {

        req.transmission.arguments = {};

        if (req.transmission.method === ENUMS.torrents.DELETE && !req.params.id) {
            return res.status(400).json({ error: 'missing req.params.id'});
        }

        if (req.params.id) {
            req.transmission.arguments.ids = [parseInt(req.params.id)];
        }

        if (req.transmission.method === ENUMS.torrents.POST) {
            if (!req.body.filename) {
                return res.status(400).json({ error: 'missing req.body.filename' });
            }
            req.transmission.arguments.filename = req.body.filename;
        }

        if (req.transmission.method === ENUMS.torrents.GET) {
            req.transmission.arguments.fields = ENUMS.fields;
        }

        return next();
    }

    function sessionResponse(req, res) {
        console.log(res.transmission);
        return res.json(res.transmission.arguments);
    }

    return {
        sessionMethod: sessionMethod,
        sessionResponse: sessionResponse,
        torrentsMethod: torrentsMethod,
        torrentsArguments: torrentsArguments,
        query: queryServer
    };
};