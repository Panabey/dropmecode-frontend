import { MARKDOWN_UPLOADS_URL } from "@/lib/constants"
import classNames from "classnames"
import Image from "next/image"
import { FC } from 'react'
import Markdown from 'react-markdown'
import { useDispatch } from "react-redux"
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import highlightStyle from 'react-syntax-highlighter/dist/cjs/styles/hljs/vs'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { CopyCodeButton } from "../CopyCodeButton/CopyCodeButton"
import { imageViewerSlice } from "../ImageViewer/slices/ImgViewer.slice"
import s from './MarkdownRender.module.css'

interface iProps {
	children: string
	className?: string
}

const Pre: FC<any> = ({ children }: any) => {
	return (
		<pre className={s.pre}>
			<CopyCodeButton>{children ? children : <div></div>}</CopyCodeButton>
			{children ? children : ''}
		</pre>
	)
}

const MDImage: FC<any> = (props: any) => {

	const dispatch = useDispatch()
	const { onChangeOpen, setValues } = imageViewerSlice.actions

	function onClickImage() {
		dispatch(setValues({ alt: props.alt, imageSrc: props.src }))
		dispatch(onChangeOpen(true))
	}

	return (
		<span className={s.image}>
			<Image src={props.src} alt={props.alt} onClick={onClickImage} width={2000} height={2000} />
			<span>{props.alt}</span>
		</span>
	)
}

export const MarkdownRender: FC<iProps> = ({ children, className: customClass }: any) => {
	return (
		<Markdown
			className={classNames({ [customClass || '']: customClass }, 'markdown-body')}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]}
			urlTransform={(uri: any) =>
				uri.startsWith("http") ? uri : `${MARKDOWN_UPLOADS_URL}${uri}`
			}
			components={{
				img(props) {
					return (
						<MDImage {...props} />
					)
				},
				pre(props) {
					return (
						<Pre>{props.children}</Pre>
					)
				},
				code(props) {
					const { children, className, node, ...rest } = props
					const match = /language-(\w+)/.exec(className || '')
					return match ? (
						<SyntaxHighlighter
							showLineNumbers={true}
							language={match[1]}
							PreTag="div"
							style={highlightStyle}
						>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code {...rest} className={className}>
							{children}
						</code>
					)
				}
			}}
		>
			{children}
		</Markdown>
	)
}
