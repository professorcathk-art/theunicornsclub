// Ultra simple test API
module.exports = (req, res) => {
  res.status(200).json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
};
