import fs from 'fs';

let content = fs.readFileSync('src/App.jsx', 'utf8');

const transformKeys = ['period', 'school', 'location', 'degree', 'detail', 'status', 'company', 'role'];

transformKeys.forEach(field => {
  const regex = new RegExp(`(${field}):\\s*(["'\`])([^<]*?)\\2`, 'g');
  content = content.replace(regex, (match, key, quote, val) => {
    // protect against inside JSX
    if (val.includes('fr:') || val.includes('<')) return match; 
    return `${key}: { fr: ${quote}${val}${quote}, en: ${quote}${val}${quote} }`;
  });
});

// For bullets array:
content = content.replace(/bullets:\s*\[([\s\S]*?)\]/g, (match, items) => {
  let modifiedItems = items.replace(/(["'`])([^]+?)\1/g, (m, q, v) => {
    if (v.includes('fr:')) return m;
    return `{ fr: ${q}${v}${q}, en: ${q}${v}${q} }`;
  });
  return `bullets: [${modifiedItems}]`;
});

fs.writeFileSync('src/App.jsx', content, 'utf8');
