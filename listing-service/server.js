const app  = require('./app.js');

const PORT = process.env.PORT || 50002;

app.listen(PORT, () => {
    console.log('Listing service is running on http://localhost:' + PORT + '/api/listings');
});
