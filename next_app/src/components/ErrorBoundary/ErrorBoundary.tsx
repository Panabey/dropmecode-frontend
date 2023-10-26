import { Component } from 'react'
import ErrorBoundaryScreen from './ErrorBoundaryScreen/ErrorBoundaryScreen'

class ErrorBoundary extends Component {
	constructor(props: any) {
		super(props)

		this.state = {
			hasError: false,
			error: {}
		}
	}
	static getDerivedStateFromError() {
		return { hasError: true }
	}
	componentDidCatch(error: any, errorInfo: any) {
		this.setState(() => {
			return { error: error }
		});
	}
	render() {
		//@ts-ignore
		if (this.state.hasError) {
			return (
				<>
					{/* @ts-ignore */}
					< ErrorBoundaryScreen error={this.state.error} requestType='Клиентская ошибка' />
				</>
			)
		}
		//@ts-ignore
		return this.props.children
	}
}

export default ErrorBoundary