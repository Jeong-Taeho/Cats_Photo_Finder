import Keyword from "./Keyword.js";

export default function Header({ $target, initialState, onChangeKeyword, onEnter }) {
	const $header = document.createElement("header");
	$header.className = "Header";
	$target.appendChild($header);

	this.state = initialState;

	this.setState = nextState => {
		if (this.state !== nextState) {
			this.state = nextState;

			keyword.setState({
				value: this.state.keyword,
			});
		}
	};

	const $title = document.createElement("h1");
	$title.innerHTML = "🐈고양이 사진 검색기🔍";
	$header.appendChild($title);
	$title.style.textAlign = "center";

	const keyword = new Keyword({
		$target: $header,
		initialState: {
			value: this.state.keyword,
		},
		onChangeKeyword,
		onEnter,
	});
}
