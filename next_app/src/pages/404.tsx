import { NotFound404PageBuilder } from "@/screens/NotFound404/NotFound404PageBuilder"
import Head from "next/head"

const Page404 = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | 404 </title>
				<meta name="robots" content="noindex" />
			</Head>
			<NotFound404PageBuilder />
		</>
	)
}

export default Page404
