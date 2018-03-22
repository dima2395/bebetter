const createMessage = (
  type,
  text,
  title = `${type.replace(/\b\w/g, l => l.toUpperCase())}!`
) => ({
  type,
  title,
  text
});

module.exports = {
  createMessage
};
