module.exports = function (legos) {
    "use strict";
    var express = require('express'),
        router = express.Router(),
        Transmission = require('transmission'),
        transmission = new Transmission({
            host: legos.transmission.host,
            port: legos.transmission.port
        });

    function callback(err, result) {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(result);
        return result;
    }

// return application status
    router.get('/', function (req, res) {
        var state = {
            session: transmission.session(callback),
            sessionStats: transmission.sessionStats(callback),
            freeSpace: transmission.freeSpace('path', callback)
        };
        // Return status of Transmission
        // return free space
        console.log('transmission:state');
        return res.json(state);
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
        return res.json(transmission.get(callback));
    });

// returns info on a specific torrent
    router.get('/torrents/:id', function (req, res) {
        // Return torrent
        console.log('torrent:get');
        return res.json(transmission.get(req.params.id, callback));
    });

// creates new torrent
    router.post('/torrents/', function (req, res) {
        var addOptions = {},
            result = transmission.addUrl(req.params.id, addOptions, callback);
        // Add Torrent
        console.log('torrent:add');
        return res.json(result);
    });

// updates a specific torrent
    router.put('/torrents/:id', function (req, res) {
        var setOptions = {};

        // start torrent
        if (req.body.start) {
            console.log('torrent:start');
            return res.json(transmission.start(req.params.id, callback));
        }
        // stop torrent
        if (req.body.stop) {
            console.log('torrent:stop');
            return res.json(transmission.stop(req.params.id, callback));
        }
        console.log('torrent:set');
        return res.json(transmission.set(req.params.id, setOptions, callback));
    });

// remove a torrent;
    router.delete('/torrents/:id', function (req, res) {
        // Remove Torrent
        console.log('torrent:remove');
        return res.json(transmission.remove(req.params.id, callback));
    });

    return router;
};