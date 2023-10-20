import { ConfidentialityPageBuilder } from '@/screens/Confidentiality/ConfidentialityPageBuilder'
import Head from 'next/head'

const ConfidentialityPage = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Политика конфиденциальности</title>
				<meta name="robots" content="noindex" />
			</Head>
			<ConfidentialityPageBuilder />
		</>
	)
}

export default ConfidentialityPage