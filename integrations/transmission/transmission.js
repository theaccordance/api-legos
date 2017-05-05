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

    function getSessionRequest(req, res, next) {
        req.transmission = {
            method: ENUMS.session.GET
        };
        return next();
    }

    function getSessionResponse(req, res) {
        return res.json(res.transmission.arguments);
    }

    function setSessionResponse(req, res, next) {
        if (res.transmission.result === "success") {
            delete req.transmission;
            delete res.transmission;
            return next();
        }
        // not a success
        return res.status(400).json({
            "error": true
        })
    }

    function setSessionRequest(req, res, next) {
        var exceptions = ["blocklist-size", "config-dir", "rpc-version", "rpc-version-minimum", "version"],
            args;

        function validateArguments(arg) {
            return exceptions.indexOf(arg) > -1;
        }

        // post w/o any fields. reject
        if (!req.body) {
            return res.status(400).json({
                "statusCode": 400,
                "error": "Missing params"
            });
        }

        args = Object.keys(req.body);

        // if any of the args match the exception list, reject
        if (args.some(validateArguments)) {
            return res.status(400).json({
                "statusCode": 400,
                "error": "Invalid Params",
                "message": 'Your request contains invalid parameters',
                "invalid_params": exceptions
            });
        }

        req.transmission = {
            method: ENUMS.session.PUT,
            arguments: req.body
        };

        return next();
    }

    function getTorrentsRequest(req, res, next) {
        req.transmission = {
            method: ENUMS.torrents.GET,
            arguments: {
                fields: ['activityDate', 'addedDate', 'doneDate', 'downloadLimit', 'eta', 'id', 'magnetLink', 'name', 'percentDone', 'rateDownload', 'rateUpload', 'uploadLimit', 'uploadRatio']
            }
        };

        if (req.params.id) {
            req.transmission.arguments.ids = [parseInt(req.params.id)];
        }
        return next();
    }

    function addTorrentRequest(req, res, next) {
        if (!req.body.filename) {
            return res.status(400).json({ error: 'no filename specified.' });
        }

        req.transmission = {
            method: ENUMS.torrents.POST,
            arguments: {
                filename: req.body.filename
            }
        };
        return next();
    }

    function verifyAddTorrent(req, res, next) {
        // torrent already exists
        if (res.transmission.arguments["torrent-duplicate"]) {
            return res.status(400).json({
                "error": "Torrent already exists"
            });
        }

        if (res.transmission.arguments["torrent-added"]) {
            req.params.id = res.transmission.arguments["torrent-added"].id;
            delete req.transmission;
            delete res.transmission;
            return next();
        }
        return res.json(res.transmission);
    }

    function removeTorrentRequest(req, res, next) {
        req.transmission = {
            method: ENUMS.torrents.DELETE,
            arguments: {
                ids: [parseInt(req.params.id)]
            }
        };

        return next();
    }

    function removeTorrentResponse(req, res) {
        if (res.transmission.result === "success") {
            return res.status(204).end();
        }
    }

    function updateTorrentRequest(req, res, next) {

        if (!req.body) {
            return res.status(400).json({
                "error": "No arguments provided in request body"
            });
        }

        req.transmission = {
            method: ENUMS.torrents.PUT,
            arguments: {
                ids: [parseInt(req.params.id)],
                downloadLimit: req.body.downloadLimit
            }
        };
        return next();
    }

    function verifyTorrentUpdate(req, res, next) {
        if (res.transmission.result === "success") {
            delete req.transmission;
            delete res.transmission;
            return next();
        }
        console.log('exception');
        return res.json(res.transmission);
    }

    function torrentsResponse(req, res) {
        return res.json(res.transmission);
    }

    function torrentResponse(req, res) {
        if (!res.transmission.arguments.torrents.length) {
            return res.status(404).json({
                error: true,
                message: 'Torrent not found',
                id: req.params.id
            });
        }
        return res.json(res.transmission.arguments.torrents[0]);

    }

    return {
        getSessionRequest: getSessionRequest,
        getSessionResponse: getSessionResponse,
        setSessionRequest: setSessionRequest,
        setSessionResponse: setSessionResponse,
        getTorrentsRequest: getTorrentsRequest,
        addTorrentRequest: addTorrentRequest,
        verifyAddTorrent: verifyAddTorrent,
        removeTorrentRequest: removeTorrentRequest,
        removeTorrentResponse: removeTorrentResponse,
        updateTorrentRequest: updateTorrentRequest,
        verifyTorrentUpdate: verifyTorrentUpdate,
        torrentsResponse: torrentsResponse,
        torrentResponse: torrentResponse,
        query: queryServer
    };
};