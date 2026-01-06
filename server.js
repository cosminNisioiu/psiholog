const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;
const distRoot = path.join(__dirname, 'dist');

// Detect whether index.html is at dist/ or dist/<project>/index.html
let staticPath = distRoot;
if (!fs.existsSync(path.join(distRoot, 'index.html'))) {
  const entries = fs.existsSync(distRoot) ? fs.readdirSync(distRoot, { withFileTypes: true }) : [];
  for (const d of entries) {
    if (d.isDirectory() && fs.existsSync(path.join(distRoot, d.name, 'index.html'))) {
      staticPath = path.join(distRoot, d.name);
      break;
    }
  }
}

app.use(express.static(staticPath));
app.get('*', (req, res) => {
  const index = path.join(staticPath, 'index.html');
  if (fs.existsSync(index)) return res.sendFile(index);
  res.status(404).send('Not Found');
});

app.listen(port, '0.0.0.0', () => console.log(`Listening on ${port} (serving ${staticPath})`));