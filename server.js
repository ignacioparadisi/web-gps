const express = require('express');

app = express();

app.use(express.static('./dist/web-gps'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: 'dist/web-gps/'});
});

app.listen(process.env.PORT || 8080);