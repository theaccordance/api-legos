module.exports = function (config) {
    "use strict";
    var express = require('express'),
        router = express.Router(),
        tm = require('./transmission')(config);

    /**
     * @apiDefine Transmission Transmission
     *
     * Type: Application
     *
     * Website: https://transmissionbt.com/
     *
     */

    /**
     * @apiDefine sessionSuccess
     * @apiSuccess {number} alt-speed-down max global download speed (in K/s)
     * @apiSuccess {boolean} alt-speed-enabled true means use the alt speeds
     * @apiSuccess {number} alt-speed-time-begin when to turn on alt speeds (units: minutes after midnight)
     * @apiSuccess {boolean} alt-speed-time-enabled true means the scheduled on/off times are used
     * @apiSuccess {number} alt-speed-time-end when to turn off alt speeds (units: minutes after midnight)
     * @apiSuccess {number} alt-speed-time-day what day(s) to turn on alt speeds
     * @apiSuccess {number} alt-speed-up max global upload speed (in K/s)
     * @apiSuccess {boolean} blocklist-enabled true means enabled
     * @apiSuccess {number} blocklist-size number of rules in the blocklist
     * @apiSuccess {boolean} dht-enabled true means allow dht in public torrents
     * @apiSuccess {string} encryption "required", "preferred", "tolerated"
     * @apiSuccess {string} download-dir default path to download torrents
     * @apiSuccess {number} peer-limit-global maximum global number of peers
     * @apiSuccess {number} peer-limit-per-torrent maximum global number of peers
     * @apiSuccess {boolean} pex-enabled true means allow pex in public torrents
     * @apiSuccess {number} peer-port port number
     * @apiSuccess {boolean} peer-port-random-on-start true means pick a random peer port on launch
     * @apiSuccess {boolean} port-forwarding-enabled true means enabled
     * @apiSuccess {number} rpc-version the current RPC API version
     * @apiSuccess {number} rpc-version-minimum the minimum RPC API version supported
     * @apiSuccess {number} seedRatioLimit the default seed ratio for torrents to use
     * @apiSuccess {boolean} seedRatioLimited true if seedRatioLimit is honored by default
     * @apiSuccess {number} speed-limit-down max global download speed (in K/s)
     * @apiSuccess {boolean} speed-limit-down-enabled true means enabled
     * @apiSuccess {number} speed-limit-up max global upload speed (in K/s)
     * @apiSuccess {boolean} speed-limit-up-enabled true means enabled
     * @apiSuccess {string} version Version of Transmission Instance
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
              "alt-speed-down": 10,
              "alt-speed-enabled": false,
              "alt-speed-time-begin": 1260,
              "alt-speed-time-day": 127,
              "alt-speed-time-enabled": false,
              "alt-speed-time-end": 420,
              "alt-speed-up": 10,
              "blocklist-enabled": false,
              "blocklist-size": 0,
              "blocklist-url": "http://www.example.com/blocklist",
              "cache-size-mb": 4,
              "config-dir": "/path/to/config/dir",
              "dht-enabled": true,
              "download-dir": "/path/to/download/dir",
              "download-dir-free-space": 223893905408,
              "download-queue-enabled": false,
              "download-queue-size": 3,
              "encryption": "preferred",
              "idle-seeding-limit": 30,
              "idle-seeding-limit-enabled": false,
              "incomplete-dir": "/path/to/incomplete/dir",
              "incomplete-dir-enabled": true,
              "lpd-enabled": false,
              "peer-limit-global": 200,
              "peer-limit-per-torrent": 60,
              "peer-port": 51413,
              "peer-port-random-on-start": false,
              "pex-enabled": true,
              "port-forwarding-enabled": true,
              "queue-stalled-enabled": false,
              "queue-stalled-minutes": 30,
              "rename-partial-files": true,
              "rpc-version": 15,
              "rpc-version-minimum": 1,
              "script-torrent-done-enabled": false,
              "script-torrent-done-filename": "",
              "seed-queue-enabled": false,
              "seed-queue-size": 3,
              "seedRatioLimit": 2,
              "seedRatioLimited": false,
              "speed-limit-down": 100,
              "speed-limit-down-enabled": false,
              "speed-limit-up": 50,
              "speed-limit-up-enabled": false,
              "start-added-torrents": true,
              "trash-original-torrent-files": false,
              "units": {
                "memory-bytes": 1000,
                "memory-units": [
                  "KB",
                  "MB",
                  "GB",
                  "TB"
                ],
                "size-bytes": 1000,
                "size-units": [
                  "KB",
                  "MB",
                  "GB",
                  "TB"
                ],
                "speed-bytes": 1000,
                "speed-units": [
                  "KB/s",
                  "MB/s",
                  "GB/s",
                  "TB/s"
                ]
              },
              "utp-enabled": true,
              "version": "2.92 (14714)"
            }
     *
     */

    /**
     * @api {get} /transmission/ Application Status
     * @apiGroup Transmission
     * @apiDescription Returns the current state of the application.
     * @apiUse sessionSuccess
     * @apiErrorExample {json} Transmission Not Found
     *    HTTP/1.1 404 Not Found
     *    {
     *      "error": true,
     *      "code": "ECONNREFUSED",
     *      "message": "Unable to connect to transmission.  check that its running before modifying the configuration"
     *    }
     *
     */
    router.get('/', tm.getSessionRequest, tm.query, tm.getSessionResponse);

    /**
     * @api {put} /transmission Update Application
     * @apiGroup Transmission
     * @apiDescription Update Application Settings
     * @apiParam {number} alt-speed-down max global download speed (in K/s)
     * @apiParam {boolean} alt-speed-enabled true means use the alt speeds
     * @apiParam {number} alt-speed-time-begin when to turn on alt speeds (units: minutes after midnight)
     * @apiParam {boolean} alt-speed-time-enabled true means the scheduled on/off times are used
     * @apiParam {number} alt-speed-time-end when to turn off alt speeds (units: minutes after midnight)
     * @apiParam {number} alt-speed-time-day what day(s) to turn on alt speeds
     * @apiParam {number} alt-speed-up max global upload speed (in K/s)
     * @apiParam {boolean} blocklist-enabled true means enabled
     * @apiParam {boolean} dht-enabled true means allow dht in public torrents
     * @apiParam {string} encryption "required", "preferred", "tolerated"
     * @apiParam {string} download-dir default path to download torrents
     * @apiParam {number} peer-limit-global maximum global number of peers
     * @apiParam {number} peer-limit-per-torrent maximum global number of peers
     * @apiParam {boolean} pex-enabled true means allow pex in public torrents
     * @apiParam {number} peer-port port number
     * @apiParam {boolean} peer-port-random-on-start true means pick a random peer port on launch
     * @apiParam {boolean} port-forwarding-enabled true means enabled
     * @apiParam {number} seedRatioLimit the default seed ratio for torrents to use
     * @apiParam {boolean} seedRatioLimited true if seedRatioLimit is honored by default
     * @apiParam {number} speed-limit-down max global download speed (in K/s)
     * @apiParam {boolean} speed-limit-down-enabled true means enabled
     * @apiParam {number} speed-limit-up max global upload speed (in K/s)
     * @apiParam {boolean} speed-limit-up-enabled true means enabled
     * @apiParamExample {json} Request Body
     *
     *  {
     *      "download-dir": "path/to/changed/dir"
     *  }
     *
     * @apiUse sessionSuccess
     */
    router.put('/', tm.setSessionRequest, tm.query, tm.setSessionResponse, tm.getSessionRequest, tm.query, tm.getSessionResponse);

    /**
     * @api {get} /transmission/torrents List All Torrents
     * @apiGroup Transmission
     * @apiDescription Retrieve an Array of Objects representing torrents
     * @apiSuccess {Array} torrents An array containing torrents
     * @apiSuccess {Number} torrents.activityDate Last time of upload or download activity
     * @apiSuccess {Number} torrents.addedDate The date when this torrent was first added
     * @apiSuccess {Number} torrents.doneDate The date when the torrent finished downloading
     * @apiSuccess {Number} torrents.eta Estimated time remaining (seconds)
     * @apiSuccess {Number} torrents.id unique identifier for the torrent
     * @apiSuccess {String} torrents.magnetLink The magnet link for the torrent
     * @apiSuccess {String} torrents.name The name of the torrent
     * @apiSuccess {Number} torrents.percentDone Download Progress 0.0 to 1.0
     * @apiSuccess {Number} torrents.rateDownload Download rate (b/s)
     * @apiSuccess {Number} torrents.rateUpload Upload rate (b/s)
     * @apiSuccess {Number} torrents.uploadRatio Seed ratio
     *
     */
    router.get('/torrents', tm.getTorrentsRequest, tm.query, tm.torrentsResponse);


    /**
     * @api {post} /transmission/torrents Add a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {String} filename Magnet Link for torrent file.
     * @apiParamExample {json} Request Body
     *
     *  {
     *      "filename": "magnet:?xt=urn:magnet.link.goes.here"
     *  }
     *
     */

    /**
     * @api {get} /transmission/torrents/:id Get a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {number} id Torrent id
     * @apiSuccess {Number} activityDate Last time of upload or download activity
     * @apiSuccess {Number} addedDate The date when this torrent was first added
     * @apiSuccess {Number} doneDate The date when the torrent finished downloading
     * @apiSuccess {Number} eta Estimated time remaining (seconds)
     * @apiSuccess {Number} id unique identifier for the torrent
     * @apiSuccess {String} magnetLink The magnet link for the torrent
     * @apiSuccess {String} name The name of the torrent
     * @apiSuccess {Number} percentDone Download Progress 0.0 to 1.0
     * @apiSuccess {Number} rateDownload Download rate (b/s)
     * @apiSuccess {Number} rateUpload Upload rate (b/s)
     * @apiSuccess {Number} uploadRatio Seed ratio
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *      "activityDate": 1493824345,
     *      "addedDate": 1493680963,
     *      "doneDate": 1493823995,
     *      "eta": -1,
     *      "id": 1,
     *      "magnetLink": "magnet:?xt=urn:path.to.magnet.link",
     *      "name": "Awesome Torrent File",
     *      "percentDone": 1,
     *      "rateDownload": 0,
     *      "rateUpload": 0,
     *      "uploadRatio": 0.0002
     *  }
     */
    router.get('/torrents/:id', tm.getTorrentsRequest, tm.query, tm.torrentResponse);

    /**
     * @api {put} /transmission/torrents/:id Update a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {number} id Torrent id
     *
     */

    /**
     * @api {delete} /transmission/torrents/:id Remove a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {number} id Torrent id
     *
     */

    /**
     * @api {put} /transmission/torrents/:id/start Start a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {number} id Torrent id
     *
     */

    /**
     * @api {put} /transmission/torrents/:id/stop Stop a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {number} id Torrent id
     *
     */

    /**
     * @api {put} /transmission/torrents/:id/verify Verify a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {number} id Torrent id
     *
     */

    /**
     * @api {put} /transmission/torrents/:id/reannounce Reannounce a Torrent
     * @apiGroup Transmission
     * @apiParam (required) {number} id Torrent id
     *
     */

    return router;
};