/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dropmecode.ru',
	sitemapSize: 5000,
	changefreq: 'daily',
	priority: 0.7,
	autoLastmod: true,
	generateIndexSitemap: true,

}