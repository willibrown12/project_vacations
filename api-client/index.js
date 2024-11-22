const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(4200, () => {
  console.log('Server is running on port 4200');
});