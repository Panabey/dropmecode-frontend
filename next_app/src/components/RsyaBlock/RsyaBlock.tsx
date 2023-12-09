'use client';
import { FC, useEffect } from "react";

function insertAfter(newNode: any, existingNode: any) {
	existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

interface iProps {
	blockId: string
	codeBlock: string
};

export const RsyaBlock: FC<iProps> = ({ blockId, codeBlock }) => {

	useEffect(() => {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = codeBlock;
		const rsyaBlock = document.querySelector(`#${blockId}`);
		if (rsyaBlock) {
			insertAfter(script, rsyaBlock);
		}

	}, [blockId, codeBlock])

	return (
		<>
			<div id={blockId}></div>
		</>
	)
}
