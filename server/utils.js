const russianTranslation = {
  success: "Успех",
  error: "Ошибка"
};

const createMessage = (type, text, title = `${russianTranslation[type]}!`) => ({
  type,
  title,
  text
});

module.exports = {
  createMessage
};
