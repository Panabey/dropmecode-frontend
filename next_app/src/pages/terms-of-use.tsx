import { TermsOfUsePageBuilder } from '@/screens/TermsOfUse/TermsOfUsePageBuilder'
import Head from 'next/head'

const TermsOfUsePage = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Условия пользования сайтом</title>
				<meta name="robots" content="noindex" />
			</Head>
			<TermsOfUsePageBuilder />
		</>

	)
}

export default TermsOfUsePage