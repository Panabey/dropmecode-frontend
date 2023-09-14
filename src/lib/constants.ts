export const API_URL = process.env.DEV_MODE === 'development' ? process.env.NEXT_PUBLIC_DEV_API_URL : process.env.NEXT_PUBLIC_PROD_API_URL
export const UPLOADS_URL = process.env.DEV_MODE === 'development' ? process.env.NEXT_PUBLIC_DEV_UPLOADS_URL : process.env.NEXT_PUBLIC_PROD_UPLOADS_URL
export const MARKDOWN_UPLOADS_URL = process.env.DEV_MODE === 'development' ? process.env.NEXT_PUBLIC_DEV_UPLOADS_MARKDOWN_URL : process.env.NEXT_PUBLIC_PROD_UPLOADS_MARKDOWN_URL