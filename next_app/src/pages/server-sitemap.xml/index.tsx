import { API_URL, SITE_URL } from '@/lib/constants';
import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';
import getSlug from 'speakingurl';

interface iSitemapObject {
	id: number;
	title: string;
	update_date: string;
}

interface iHandbookObject extends iSitemapObject {
	handbook_slug: string;
}

export interface iSitemapResponse {
	handbooks: iHandbookObject[];
	articles: iSitemapObject[];
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const response = await fetch(API_URL + '/utils/sitemap', {
		method: 'POST',
		headers: {
			'X-Use-Cache': 'true'
		},
		credentials: 'include'
	})
	const errorCode = response.ok ? false : response.status;
	if (errorCode) {
		return {
			props: {
				pageInfo: []
			},
			redirect: {
				destination: '/error',
				permanent: true,
			},
		}
	}
	const sitemap: iSitemapResponse = await response.json()
	const links: any = [
		...sitemap.articles.map((article) => {
			return {
				loc: `${SITE_URL}/articles/${article.id}-${getSlug(article.title, { lang: 'ru' })}`,
				lastmod: new Date(article.update_date).toISOString(),
				priority: 0.5,
				changefreq: 'daily'
			}
		}),
		...sitemap.handbooks.map((handbook) => {
			return {
				loc: SITE_URL + '/langs/' + String(handbook.handbook_slug).toLowerCase() + `/${handbook.id}-${getSlug(handbook.title.toLowerCase(), { lang: 'ru' })}`,
				lastmod: new Date(handbook.update_date).toISOString(),
				priority: 0.5,
				changefreq: 'daily'
			}
		})
	]

	return getServerSideSitemapLegacy(ctx, links)
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }