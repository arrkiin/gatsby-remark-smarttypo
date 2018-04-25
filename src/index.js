const visit = require(`unist-util-visit`);

var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  c: '©',
  r: '®',
  p: '§',
  tm: '™'
};

function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  visit(markdownAST, `text`, node => {
    const processedText = node.value.replace(SCOPED_ABBR_RE, replaceFn);
    node.value = processedText;
  });

  return markdownAST;
};
