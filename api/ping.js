// Ultra simple ping test
module.exports = (req, res) => {
  res.status(200).json({ ping: 'pong', time: new Date().toISOString() });
};
