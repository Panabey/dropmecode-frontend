import { HelpPageBuilder } from '@/screens/Help/HelpPageBuilder'
import Head from 'next/head'

const HelpPage = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Помощь</title>
				<meta name="robots" content="noindex" />
			</Head>
			<HelpPageBuilder />
		</>
	)
}

export default HelpPage