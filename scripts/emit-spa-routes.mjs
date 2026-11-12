import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { blogPosts } from '../src/data/blogPosts.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const origin = 'https://voicelift.app'
const authorPerson = {
  '@type': 'Person',
  '@id': 'https://anthonysdigital.net/#person',
  name: 'Anthony Smith',
  url: 'https://anthonysdigital.net/',
}
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function escapeText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr(value) {
  return escapeText(value).replace(/"/g, '&quot;')
}

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${label} in dist/index.html`)
  }
  return html.replace(pattern, replacement)
}

function setTitle(html, title) {
  return replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`, 'title')
}

function setMeta(html, key, content) {
  const pattern = new RegExp(`<meta\\b(?=[^>]*(?:name|property)=["']${key}["'])[^>]*>`, 'i')
  return replaceOnce(html, pattern, (tag) => {
    if (!/\bcontent\s*=\s*"/i.test(tag)) {
      throw new Error(`Meta ${key} has no content attribute`)
    }
    return tag.replace(/\bcontent\s*=\s*"[^"]*"/i, `content="${escapeAttr(content)}"`)
  }, `meta ${key}`)
}

function setCanonical(html, url) {
  return replaceOnce(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
    (tag) => tag.replace(/\bhref\s*=\s*"[^"]*"/i, `href="${escapeAttr(url)}"`),
    'canonical link',
  )
}

function withRouteMeta(html, { title, description, url, ogType }) {
  let next = setTitle(html, title)
  next = setMeta(next, 'description', description)
  next = setCanonical(next, url)
  next = setMeta(next, 'og:url', url)
  next = setMeta(next, 'og:title', title)
  next = setMeta(next, 'og:description', description)
  next = setMeta(next, 'og:type', ogType)
  next = setMeta(next, 'twitter:url', url)
  next = setMeta(next, 'twitter:title', title)
  next = setMeta(next, 'twitter:description', description)
  return next
}

function writeHtml(relativePath, html) {
  const file = join(dist, relativePath)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

function sitemapXml(posts) {
  const newest = posts.reduce((latest, post) => (post.date > latest ? post.date : latest), posts[0].date)
  const urls = [
    { loc: `${origin}/`, lastmod: newest, changefreq: 'weekly', priority: '1.0' },
    { loc: `${origin}/#features`, lastmod: '2026-03-27', changefreq: 'monthly', priority: '0.8' },
    { loc: `${origin}/#how-it-works`, lastmod: '2026-03-27', changefreq: 'monthly', priority: '0.8' },
    { loc: `${origin}/#pricing`, lastmod: '2026-03-27', changefreq: 'monthly', priority: '0.8' },
    { loc: `${origin}/#faq`, lastmod: '2026-03-27', changefreq: 'monthly', priority: '0.7' },
    { loc: `${origin}/blog`, lastmod: newest, changefreq: 'weekly', priority: '0.9' },
    ...posts.map((post) => ({
      loc: `${origin}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: '0.8',
    })),
  ]
  const body = urls.map((url) => `  <url>
    <loc>${escapeText(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8')
if (!indexHtml.includes('/assets/')) {
  throw new Error('dist/index.html is missing built asset URLs')
}

writeHtml('404.html', indexHtml)

const blogDescription = 'Insights on voice-first fitness tracking, gym psychology, and training data that actually matters.'
const blogHtml = withRouteMeta(indexHtml, {
  title: 'VoiceLift Blog',
  description: blogDescription,
  url: `${origin}/blog`,
  ogType: 'website',
}).replace('</head>', `  ${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'VoiceLift Blog',
  description: blogDescription,
  url: `${origin}/blog`,
  author: authorPerson,
  creator: authorPerson,
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${origin}/blog/${post.slug}`,
    datePublished: post.date,
    author: authorPerson,
    creator: authorPerson,
  })),
})}
  </head>`)
writeHtml('blog/index.html', blogHtml)

const seen = new Set()
for (const post of blogPosts) {
  if (!slugPattern.test(post.slug) || seen.has(post.slug)) {
    throw new Error(`Unsafe or duplicate blog slug: ${post.slug}`)
  }
  seen.add(post.slug)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
    throw new Error(`Blog post ${post.slug} is missing a YYYY-MM-DD date`)
  }
  const description = post.metaDescription || post.excerpt
  const url = `${origin}/blog/${post.slug}`
  const html = withRouteMeta(indexHtml, {
    title: `${post.title} | VoiceLift Blog`,
    description,
    url,
    ogType: 'article',
  }).replace('</head>', `  ${jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.date,
    author: authorPerson,
    creator: authorPerson,
    image: post.image,
    mainEntityOfPage: url,
    publisher: {
      '@type': 'Organization',
      name: 'VoiceLift',
      logo: { '@type': 'ImageObject', url: `${origin}/logo.svg` },
    },
  })}
  </head>`)
  writeHtml(join('blog', post.slug, 'index.html'), html)
}

const sitemap = sitemapXml(blogPosts)
writeFileSync(join(dist, 'sitemap.xml'), sitemap)
writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap)

const required = ['404.html', 'blog/index.html', 'favicon.ico', 'og-image.png', 'sitemap.xml']
for (const post of blogPosts) required.push(join('blog', post.slug, 'index.html'))
for (const relativePath of required) {
  readFileSync(join(dist, relativePath))
}

console.log(`Wrote dist/404.html, dist/blog/index.html, and ${blogPosts.length} post pages`)
