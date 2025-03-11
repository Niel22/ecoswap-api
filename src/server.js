const app = require('./app');
const db = require('./models/index');
require('express-async-errors');


const port = process.env.APP_PORT;

app.listen(port, () => {
    // db.sequelize.sync();
    console.log(`Server started on ${port}`)
})