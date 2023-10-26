// pages/server-sitemap-index.xml/index.tsx
import { GetServerSideProps } from 'next'
import { getServerSideSitemapIndexLegacy } from 'next-sitemap'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// Method to source urls from cms
	// const urls = await fetch('https//example.com/api')

	return getServerSideSitemapIndexLegacy(ctx, [
		'https://example.com/path-1.xml',
		'https://example.com/path-2.xml',
	])
}

// Default export to prevent next.js errors
export default function SitemapIndex() { }