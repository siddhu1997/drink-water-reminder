require('module-alias/register');
const DPI = require('@DPI');
const app = require('./app');

require('./utils');
require('./services');
require('./managers');

const port = DPI.get('Secrets').get("PORT");
DPI.get("Green").initializeWebHookClient(app);

process.on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception", "index.js");
});
  
process.on("unhandledRejection", (err) => {
    console.error(err, "Unhandled Rejection", "index.js");
});

app.set('port', port);
app.listen(port, () => {
    console.log(`Server listening on port: ${port}. ENV - ${process.env.NODE_ENV}`);
});
