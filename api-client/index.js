const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the 'public' directory (built React app)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the React app for any other routes (this ensures routing works)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(4200, () => {
  console.log('Server is running on port 4200');
});