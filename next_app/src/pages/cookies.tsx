import { CookiesPageBuilder } from "@/screens/Cookies/CookiesPageBuilder"
import Head from "next/head"

const CookiesPage = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Куки-файлы</title>
				<meta name="robots" content="noindex" />
			</Head>
			<CookiesPageBuilder />
		</>
	)
}

export default CookiesPage