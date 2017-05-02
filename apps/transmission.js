module.exports = function (legos) {
    "use strict";
    var express = require('express'),
        router = express.Router(),
        request = require('request'),
        sessionId = null;

    function getTorrent(req, res) {
        var body = {
                method: 'torrent-get',
                arguments: {
                    fields: ['activityDate', 'addedDate', 'bandwidthPriority', 'comment', 'corruptEver', 'creator', 'dateCreated', 'desiredAvailable', 'doneDate', 'downloadDir', 'downloadedEver', 'downloadLimit', 'downloadLimited', 'error', 'errorString', 'eta', 'files', 'fileStats', 'hashString', 'haveUnchecked', 'haveValid', 'honorsSessionLimits', 'id', 'isFinished', 'isPrivate', 'leftUntilDone', 'magnetLink', 'manualAnnounceTime', 'maxConnectedPeers', 'metadataPercentComplete', 'name', 'peer-limit', 'peers', 'peersConnected', 'peersFrom', 'peersGettingFromUs', 'peersKnown', 'peersSendingToUs', 'percentDone', 'pieces', 'pieceCount', 'pieceSize', 'priorities', 'rateDownload', 'rateUpload', 'recheckProgress', 'seedIdleLimit', 'seedIdleMode', 'seedRatioLimit', 'seedRatioMode', 'sizeWhenDone', 'startDate', 'status', 'trackers', 'trackerStats', 'totalSize', 'torrentFile', 'uploadedEver', 'uploadLimit', 'uploadLimited', 'uploadRatio', 'wanted', 'webseeds', 'webseedsSendingToUs']
                }
            },
            options = {
                url: 'http://localhost:9091/transmission/rpc',
                method: 'POST',
                headers: {
                    'x-transmission-session-id': sessionId
                }
            };

        function callback(error, response, body) {
            if (error) {
                console.log(error);
                return res.json({error: true});
            }

            if (response.statusCode === 409) {
                console.log('statuscode:409');
                options.headers['x-transmission-session-id'] = response.headers['x-transmission-session-id'];
                return request(options, callback);
            }


            if (response) {
                console.log(response.statusCode);
            }
            return res.json(JSON.parse(body));
        }

        if (req.params.id) {
            body.arguments.ids = [parseInt(req.params.id)];
        }

        options.body = JSON.stringify(body);

        request(options, callback);
    }




    // REST endpoints

    // router.route('/')
    //     .get(getTransmission);
    //     .put();
    router.route('/torrents/')
        .get(getTorrent);
    //     .post()
    //     .put();
    router.route('/torrents/:id')
        .get(getTorrent);
    //     .put()
    //     .delete();

    return router;
};