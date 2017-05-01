# legos-api
Modular REST API endpoints for apps 

## Installation
```bash
npm install legos-api
```

## Example
```javascript
var config = require('./config.json'),
    port = process.env.PORT || 8000,
    express = require('express'),
    api = express(),
    legos = require('legos-api')(config);

api.use('/transmission', legos.transmission);

api.listen(port, function () {
    console.log('Api listening on port', port);
});
```


