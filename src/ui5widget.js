(function() { 
	let shadowRoot;
	let callcount = 0;

	let scriptsLoadPromise;

	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		</style> 
	`;
	
	const div = document.createElement('div');
    div.innerHTML = '<div id="content">Hello!</div>';
	
	//Script loading with callback on load
	function loadScript(src, callback) {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		script.addEventListener("load", callback);
		shadowRoot.appendChild(script);
    }


	class Ui5Widget extends HTMLElement {
		constructor() {
			super(); 
			shadowRoot = this.attachShadow({mode: "open"});

			//append template
			shadowRoot.appendChild(template.content.cloneNode(true));

			shadowRoot.appendChild(div);
			
			//add onClick listener
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
		
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			callcount = callcount + 1;
			console.log(callcount);
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
		}
	}

	customElements.define("com-ies-ea-ui5widget", Ui5Widget);
})();
