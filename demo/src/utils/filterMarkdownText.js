const filterMarkdownText = (text) => {
  let new_str = "";
  for (let i = 0; i < text.length; i++) {
    if (
      (65 <= text[i].charCodeAt() && text[i].charCodeAt() <= 90) ||
      (97 <= text[i].charCodeAt() && text[i].charCodeAt() <= 122) ||
      ("0".charCodeAt() <= text[i].charCodeAt() &&
        text[i].charCodeAt() <= "9".charCodeAt()) ||
      text[i].charCodeAt() === 32
    ) {
      new_str += text[i];
    } // Access character by index
  }
  return new_str;
};

export default filterMarkdownText;
