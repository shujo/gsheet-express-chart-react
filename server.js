const express = require('express');
const cors = require('cors');
const path = require('path');
const routeHandler = require('./routes/index');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname));
app.use(cors());

routeHandler(app); //route handler

// Serve static assets if in production
app.use(express.static('client/build'));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));