const fs = require('fs');

let content = fs.readFileSync('src/data/projects.js', 'utf8');

const fields = ['title', 'tagline', 'type', 'team', 'context', 'detail'];

fields.forEach(field => {
  const regex = new RegExp(`(${field}):\\s*(["'\`])([^]*?)\\2`, 'g');
  content = content.replace(regex, (match, key, quote, val) => {
    // avoid double replacing
    if (val.includes('fr:')) return match;
    return `${key}: { fr: ${quote}${val}${quote}, en: ${quote}${val}${quote} }`;
  });
});

fs.writeFileSync('src/data/projects.js', content, 'utf8');
