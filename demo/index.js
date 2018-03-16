const Express = require('express');
let app = Express();
require('./handler')(app);
app.listen(5200, '0.0.0.0');