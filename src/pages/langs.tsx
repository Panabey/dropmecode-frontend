import { LangsPageBuilder } from '@/screens/Langs/LangsPageBuilder'
import Head from 'next/head'

const LangsPage = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Языки программирования</title>
			</Head>
			<LangsPageBuilder />
		</>

	)
}

export default LangsPage