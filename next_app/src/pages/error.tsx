import ErrorBoundaryScreen from "@/components/ErrorBoundary/ErrorBoundaryScreen/ErrorBoundaryScreen"
import Head from "next/head"

const ErrorPage = () => {
  return (
    <>
      <Head>
        <title>DROPMECODE | Проблема</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ErrorBoundaryScreen error={{}} requestType="Серверный рендер" />
    </>
  )
}

export default ErrorPage

export async function getStaticProps() {
  return {
    notFound: true,
  };
}