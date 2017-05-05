module.exports = {
    session: {
        GET: 'session-get',
        PUT: 'session-set'
    },
    torrents: {
        GET: 'torrent-get',
        POST: 'torrent-add',
        PUT: 'torrent-set',
        DELETE: 'torrent-remove',
        fields: ['activityDate', 'addedDate', 'bandwidthPriority', 'comment', 'corruptEver', 'creator', 'dateCreated', 'desiredAvailable', 'doneDate', 'downloadDir', 'downloadedEver', 'downloadLimit', 'downloadLimited', 'error', 'errorString', 'eta', 'files', 'fileStats', 'hashString', 'haveUnchecked', 'haveValid', 'honorsSessionLimits', 'id', 'isFinished', 'isPrivate', 'leftUntilDone', 'magnetLink', 'manualAnnounceTime', 'maxConnectedPeers', 'metadataPercentComplete', 'name', 'peer-limit', 'peers', 'peersConnected', 'peersFrom', 'peersGettingFromUs', 'peersKnown', 'peersSendingToUs', 'percentDone', 'pieces', 'pieceCount', 'pieceSize', 'priorities', 'rateDownload', 'rateUpload', 'recheckProgress', 'seedIdleLimit', 'seedIdleMode', 'seedRatioLimit', 'seedRatioMode', 'sizeWhenDone', 'startDate', 'status', 'trackers', 'trackerStats', 'totalSize', 'torrentFile', 'uploadedEver', 'uploadLimit', 'uploadLimited', 'uploadRatio', 'wanted', 'webseeds', 'webseedsSendingToUs'],

    },
    torrentActions: {
        start: 'torrent-start',
        stop: 'torrent-stop',
        verify: 'torrent-verify',
        reannounce: 'torrent-reannounce'
    },
    stats: {
        GET: 'session-stats'
    },
    error: {
        connection: 'ECONNREFUSED'
    }
};