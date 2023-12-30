interface iArticleJSONLD {
	title: string,
	author: string,
	url: string,
	genre: string,
	keywords: string,
	datePublished: Date,
	dateModified: Date,
	description: string,
}

export const createArticleJSONLD = (info: iArticleJSONLD) => {
	return JSON.stringify({
		"@context": "http://www.schema.org",
		"@type": "Article",
		"@id": info.url,
		headline: info.title,
		url: info.url,
		genre: info.genre,
		keywords: info.keywords,
		datePublished: info.datePublished.toISOString(),
		dateModified: info.dateModified.toISOString(),
		description: info.description,
	});
}

interface iLangDocsThemeJSONLD {
	title: string,
	author: string,
	url: string,
	genre: string,
	keywords: string,
	datePublished: Date,
	dateModified: Date,
	description: string,
}

export const createLangDocsThemeJSONLD = (info: iLangDocsThemeJSONLD) => {
	return JSON.stringify({
		"@context": "http://www.schema.org",
		"@type": "Article",
		"@id": info.url,
		headline: info.title,
		url: info.url,
		genre: info.genre,
		keywords: info.keywords,
		datePublished: info.datePublished.toISOString(),
		dateModified: info.dateModified.toISOString(),
		description: info.description,
	});
}

interface iQuizJSONLD {
	name: string,
	url: string,
	genre: string,
	keywords: string,
	description: string,
}

export const createQuizJSONLD = (info: iQuizJSONLD) => {
	return JSON.stringify({
		"@context": "http://www.schema.org",
		"@type": "WebSite",
		"@id": info.url,
		name: info.name,
		url: info.url,
		genre: info.genre,
		keywords: info.keywords,
		description: info.description,
	});
}