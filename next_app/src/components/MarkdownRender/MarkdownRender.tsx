import { MARKDOWN_UPLOADS_URL } from "@/lib/constants"
import classNames from "classnames"
import { FC } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import highlightStyle from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { CopyCodeButton } from "../CopyCodeButton/CopyCodeButton"

interface iProps {
	children: string
	className?: string
}

interface iPropsPre {
	children: any
}
const Pre: FC<iPropsPre> = ({ children }) => {
	return (
		<pre style={{ position: 'relative' }}>
			<CopyCodeButton>{children}</CopyCodeButton>
			{children}
		</pre>
	)
}

export const MarkdownRender: FC<iProps> = ({ children, className: customClass }) => {
	return (
		<ReactMarkdown
			className={classNames({ [customClass || '']: customClass }, 'markdown-body')}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			transformImageUri={uri =>
				uri.startsWith("http") ? uri : `${MARKDOWN_UPLOADS_URL}${uri}`
			}
			components={{
				pre: Pre,
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<SyntaxHighlighter
							showLineNumbers={true}
							{...props}
							children={String(children).replace(/\n$/, '')}
							language={match[1]}
							PreTag="div"
							style={highlightStyle}
						/>
					) : (
						<code {...props} className={className}>
							{children}
						</code>
					)
				}
			}}
		>
			{children}
		</ReactMarkdown>
	)
}
