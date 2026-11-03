const http = require('http');

const PORT = process.env.PORT || 3002;
const sampleData = [
  {
    "id": 101,
    "name": "Laptop",
    "price": 55000
  },
  {
    "id": 102,
    "name": "Headphones",
    "price": 2500
  }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.url === '/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'UP', service: 'product-service' }));
  }

  if (req.url === '/products' || req.url === '/') {
    res.writeHead(200);
    return res.end(JSON.stringify({ service: 'product-service', data: sampleData }, null, 2));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found', path: req.url }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('product-service listening on port ' + PORT);
});
