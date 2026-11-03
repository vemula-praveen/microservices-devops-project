const http = require('http');

const PORT = process.env.PORT || 3003;
const sampleData = [
  {
    "id": 5001,
    "userId": 1,
    "productId": 101,
    "status": "CONFIRMED"
  },
  {
    "id": 5002,
    "userId": 2,
    "productId": 102,
    "status": "PROCESSING"
  }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'UP', service: 'order-service' }));
  }

  if (req.url === '/orders' || req.url === '/') {
    res.writeHead(200);
    return res.end(JSON.stringify({ service: 'order-service', data: sampleData }, null, 2));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found', path: req.url }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('order-service listening on port ' + PORT);
});
