export const goosePhrases = [
	{
		text: 'Я - гусь. На вашу страницу припрусь!',
		callback: () => {
			setTimeout(() => {
				const header = document.querySelector(".headerDesktop");
				if (header) {
					const goose2 = document.querySelector('.goose2');
					goose2?.classList.remove('hidden')
					header.appendChild(goose2!)
				}
			}, 3000)
		}
	},
	{
		text: 'Я - гусь. Сотру код и испарюсь',
		callback: () => {
			setTimeout(() => {
				const codeBlocks = document.querySelectorAll(".markdown-body pre")
				if (!codeBlocks) {
					return
				}
				document.body.classList.add('nodisplay')
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
			audio.volume = 0.2;
			audio.play();
			setTimeout(() => {
				audio.pause();
			}, 1000)
		}
	},
	{
		text: 'Я - гусь. В курсор превращусь',
		callback: () => {
			setTimeout(() => {
				if (typeof document !== 'undefined') {
					document.body.classList.add('goose__cursor');
				}
			}, 1000)
		}
	},
	{
		text: 'Я - гусь. Лапкой об экран потрусь',
		callback: () => {
			let counter = 0;
			const paws = document.querySelector('.goose__paws');
			setTimeout(() => {
				const timer = setInterval(() => {
					const newGoose = paws?.cloneNode() as HTMLElement;
					document.body.appendChild(newGoose);
					newGoose.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
					newGoose.style.top = `${Math.floor(Math.random() * document.body.scrollHeight)}px`;
					newGoose.style.left = `${Math.floor(Math.random() * document.body.clientWidth)}px`;
					newGoose.classList.remove('hidden');
					counter++;
					if (counter === 50) {
						clearInterval(timer);
						const goosesPaws = document.querySelectorAll('.goose__paws');
						goosesPaws.forEach((paw) => {
							paw?.remove();
						})
					}
				}, 200)
			}, 2000)
		}
	},
]