const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('OK');
});
app.get('*', (req, res) => {
  res.send('404 Not Found');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
