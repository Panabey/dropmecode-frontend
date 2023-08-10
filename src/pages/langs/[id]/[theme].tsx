import { LangDocsThemePageBuilder } from "@/screens/LangDocsTheme/LangDocsThemePageBuilder";
import { FC } from "react";

interface iProps {
  mdData: any
}

const LangDocsPageInfo: FC<iProps> = ({ mdData }) => {

  return (
    <LangDocsThemePageBuilder mdData={mdData} />
  )
}

export async function getServerSideProps({ params }: any) {
  const mdData = '';

  return {
    props: {
      mdData,
    },
  };
}

export default LangDocsPageInfo