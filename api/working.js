// Ultra simple working test API
module.exports = (req, res) => {
  res.status(200).json({ 
    working: true, 
    message: 'API is working!', 
    timestamp: new Date().toISOString()
  });
};
