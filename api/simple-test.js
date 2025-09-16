// Very simple test function
module.exports = (req, res) => {
  res.status(200).json({
    message: 'Simple test works!',
    timestamp: new Date().toISOString(),
    method: req.method
  });
};
