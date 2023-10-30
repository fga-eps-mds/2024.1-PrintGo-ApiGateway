const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 4000;

const gateway = app.listen(PORT, () => {
    console.log(`Gateway is running on ${PORT}`);
});

module.exports = { gateway, app };
