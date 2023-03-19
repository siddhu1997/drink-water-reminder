require('module-alias/register');
const DPI = require('@DPI');
const mongoose = require('mongoose');
const app = require('./app');

require('./utils');
require('./services');
require('./db');
require('./managers');

const port = DPI.get('Secrets').get("PORT");
DPI.get("Green").initializeWebHookClient(app);

mongoose.connect(DPI.get('Secrets').get('MONGO.URI'), {
    dbName: DPI.get('Secrets').get('MONGO.DB'),
}).then(() => console.log('MongoDB Connected')).catch((error) => console.error(error));

mongoose.set('strictQuery', false);
mongoose.set("debug", process.env.NODE_ENV === "localhost");

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
