const http = require('http');

const PORT = process.env.PORT || 3001;
const sampleData = [
  {
    "id": 1,
    "name": "Praveen",
    "email": "praveen@example.com"
  },
  {
    "id": 2,
    "name": "Ananya",
    "email": "ananya@example.com"
  }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'UP', service: 'user-service' }));
  }

  if (req.url === '/users' || req.url === '/') {
    res.writeHead(200);
    return res.end(JSON.stringify({ service: 'user-service', data: sampleData }, null, 2));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found', path: req.url }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('user-service listening on port ' + PORT);
});
