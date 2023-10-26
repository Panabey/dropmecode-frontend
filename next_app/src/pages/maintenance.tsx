import { MaintenanceMode } from '@/components/MaintenanceMode/MaintenanceMode'
import Head from 'next/head'

const MaintenancePage = () => {
	return (
		<>
			<Head>
				<title>DROPMECODE | Технические работы</title>
				<meta name="robots" content="noindex" />
			</Head>
			<MaintenanceMode />
		</>
	)
}

export default MaintenancePage