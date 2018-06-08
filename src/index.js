const visit = require(`unist-util-visit`);

var SCOPED_ABBR = {
  c: '©',
  r: '®',
  p: '§',
  tm: '™',
  '1/2':'½',
  '1/4':'¼',
  '3/4':'¾',
  '*':'×',
  '/':'÷',
  '+-':'±',
  'deg':'°',
  '^1':'¹',
  '^2':'²',
  '^3':'³',
  'my':'µ'
};

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var SCOPED_ABBR_RE = RegExp('\\((' + Object.keys(SCOPED_ABBR).map(key => escapeRegExp(key)).join('|') + ')\\)','g')

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
