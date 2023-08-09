import { LangsPageBuilder } from '@/screens/Langs/LangsPageBuilder'
import Head from 'next/head'

const LangsPage = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Языки программирования</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<LangsPageBuilder />
		</>

	)
}

export default LangsPage