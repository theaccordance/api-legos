# legos-api
Build your own API with modular RESTful integrations.

## Installation
```bash
npm install legos-api
```

## Integrations
- Transmission

## Documentation

API Documentation is available at http://joemainwaring.com/api-legos/

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


