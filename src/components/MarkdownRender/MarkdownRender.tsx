import classNames from "classnames"
import { FC } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import rehypeHighlight from 'rehype-highlight/lib'
import remarkGfm from 'remark-gfm'

interface iProps {
	children: string
	className?: string
}

export const MarkdownRender: FC<iProps> = ({ children, className }) => {
	return (
		<ReactMarkdown
			className={classNames({ [className || '']: className }, 'markdown-body')}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeHighlight]}
		// components={{
		// 	code({ node, inline, className, children, ...props }) {
		// 		const match = /language-(\w+)/.exec(className || '')
		// 		return !inline && match ? (
		// 			<SyntaxHighlighter
		// 				{...props}
		// 				children={String(children).replace(/\n$/, '')}
		// 				language={match[1]}
		// 				PreTag="div"

		// 			/>
		// 		) : (
		// 			<code {...props} className={className}>
		// 				{children}
		// 			</code>
		// 		)
		// 	}
		// }}
		>
			{children}
		</ReactMarkdown>
	)
}
