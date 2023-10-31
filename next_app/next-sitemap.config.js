/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_PROD_SITE_URL || 'https://dropmecode.ru',
	sitemapSize: 5000,
	changefreq: 'daily',
	priority: 0.7,
	autoLastmod: true,
	generateIndexSitemap: true,
	exclude: ['/server-sitemap.xml'],
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/terms-of-use/', '/confidentiality/', '/error/', '/cookies/', '/maintenance', '/404'],
			}
		],
		additionalSitemaps: [
			'https://dropmecode.ru/server-sitemap.xml',
		],

	},
}