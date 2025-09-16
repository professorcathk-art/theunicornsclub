// Simple health check endpoint
module.exports = (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    message: 'API is working'
  });
};
