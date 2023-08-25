import classNames from "classnames"
import { FC } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import highlightStyle from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface iProps {
	children: string
	className?: string
}

export const MarkdownRender: FC<iProps> = ({ children, className: customClass }) => {
	return (
		<ReactMarkdown
			className={classNames({ [customClass || '']: customClass }, 'markdown-body')}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			components={{
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
