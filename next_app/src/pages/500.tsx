import ErrorBoundaryScreen from "@/components/ErrorBoundary/ErrorBoundaryScreen/ErrorBoundaryScreen"
import Head from "next/head"

const Page500 = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Проблема</title>
				<meta name="robots" content="noindex" />
			</Head>
			<ErrorBoundaryScreen error={{}} requestType="Запрос с 500 ошибкой" />
		</>
	)
}

export default Page500