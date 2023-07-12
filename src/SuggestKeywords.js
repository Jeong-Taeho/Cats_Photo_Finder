export default function SuggestKeywords({ $target, initialState, onKeywordSelect }) {
	const $suggest = document.createElement("div");

	$suggest.className = "Keywords";
	$target.appendChild($suggest);

	this.state = initialState;

	this.setState = nextState => {
		this.state = { ...this.state, ...nextState };
		this.render();
	};

	this.render = () => {
		const { keywords, cursorWord } = this.state;

		$suggest.style.display = keywords.length > 0 ? "block" : "none";

		$suggest.innerHTML = `
        <ul>
            ${keywords
				.map(
					(keyword, i) => `
                <li class="${cursorWord === i ? "active" : ""}">${keyword}</li>`
				)
				.join("")}
        </ul>`;
	};

	this.render();

	$suggest.addEventListener("click", e => {
		const $li = e.target.closest("li");

		if ($li) {
			onKeywordSelect($li.textContent);
		}
	});

	window.addEventListener("keydown", e => {
		if ($suggest.style.display !== "none") {
			const { key } = e;
			if (key === "ArrowUp") {
				const nextCursor = this.state.cursorWord - 1;
				this.setState({
					...this.state,
					cursorWord: nextCursor < 0 ? this.state.keywords.length - 1 : nextCursor,
				});
			} else if (key === "ArrowDown") {
				const nextCursor = this.state.cursorWord + 1;
				this.setState({
					...this.state,
					cursorWord: nextCursor > this.state.keywords.length - 1 ? 0 : nextCursor,
				});
			} else if (key === "Enter") {
				onKeywordSelect(this.state.keywords[this.state.cursorWord]);
			}
		}
	});
}
