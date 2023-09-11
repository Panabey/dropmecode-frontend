export const goosePhrases = [{
	text: 'Я - гусь. На вашу страницу припрусь!',
	callback: () => {
		setTimeout(() => {
			const header = document.getElementsByTagName("header");
			if (header.length > 0) {
				const goose2 = document.querySelector('.goose2');
				goose2?.classList.remove('hidden')
				header[0].appendChild(goose2!)
			}
		}, 3000)
	}
},
{
	text: 'Я - гусь. Сотру код и испарюсь',
	callback: () => {
		setTimeout(() => {
			const codeBlocks = document.querySelectorAll(".markdown-body pre");
			for (let i = 0; i < codeBlocks.length; i++) {
				codeBlocks[i].remove();
			}
		}, 3000)
	}
},
{
	text: 'Я - гусь. На главную вернусь',
	callback: () => {
		setTimeout(() => {
			window.location.href = '/'
		}, 3000)
	}
},
{
	text: 'Я - гусь. Разозлюсь и раскричусь',
	callback: () => {
		const audio = new Audio('/assets/Goose/honk-sound.mp3');
		audio.loop = true;
		audio.volume = 0.5;
		audio.play();
		setTimeout(() => {
			audio.pause();
		}, 1000)
	}
}
]