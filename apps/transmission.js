module.exports = function (legos) {
    "use strict";
    var express = require('express'),
        router = express.Router(),
        Transmission = require('transmission'),
        transmission = new Transmission({
            host: legos.transmission.host,
            port: legos.transmission.port
        });

    // return application status
    router.get('/', function (req, res) {
        // var state = {
        //     session: transmission.session(callback),
        //     sessionStats: transmission.sessionStats(callback),
        //     freeSpace: transmission.freeSpace('path', callback)
        // };
        // Return status of Transmission
        // return free space
        console.log('transmission:state');
        transmission.session(function (err, session) {
            if (err) {
                return console.error(err);
            }

            transmission.sessionStats(function (err, sessionStats) {
                if (err) {
                    return console.error(err);
                }

                return res.json({
                    session: session,
                    sessionStats: sessionStats
                });
            })
        });

    });

    //updates application
    router.put('/', function (req, res) {
        console.log('transmission:update');
        return res.json({mock: true});
    });

    // returns list of torrents
    router.get('/torrents/', function (req, res) {
        // Return list of torrents
        console.log('transmission:torrents');
        transmission.get(function (err, torrents) {
            if (err) {
                return console.error(err);
            }
            return res.json(torrents);
        });

    });

    // // returns info on a specific torrent
    // router.get('/torrents/:id', function (req, res) {
    //     console.log('torrent:get', req.params.id);
    //     transmission.get(req.params.id, function (err, torrents) {
    //         if (err) {
    //             return res.json(err);
    //         }
    //         return res.json(torrents);
    //     });
    // });

    // // creates new torrent
    // router.post('/torrents/', function (req, res) {
    //     var addOptions = {},
    //         result = transmission.addUrl(req.params.id, callback);
    //     // Add Torrent
    //     console.log('torrent:add');
    //     return res.json(result);
    // });

    // // updates a specific torrent
    // router.put('/torrents/:id/start', function (req, res) {
    //     console.log('start', req.params.id);
    //     return transmission.start(req.params.id, function (err, torrents) {
    //         if (err) {
    //             return res.json(err);
    //         }
    //         console.log('start:success', torrents);
    //         return res.json(torrents);
    //     });
    // });

    // // remove a torrent;
    // router.delete('/torrents/:id', function (req, res) {
    //     // Remove Torrent
    //     console.log('torrent:remove');
    //     return res.json(transmission.remove(req.params.id, callback));
    // });

    return router;
};