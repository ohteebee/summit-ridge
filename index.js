var express = require('express');
var app = express();

app.use(express.static('.'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.set('port', process.env.PORT || 4444);

app.listen(4444, function() {
    console.log('Express server listening on port 4444');
});
