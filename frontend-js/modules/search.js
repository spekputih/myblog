import axios from "axios"

export default class Search {
	constructor() {
		this.injectHTML()
		this.textField = document.querySelector(".live-search-field")
		this.overlay = document.querySelector(".search-overlay")
		this.closeIcon = document.querySelector(".close-live-search")
		this.headerSearch = document.querySelector(".header-search-icon")
		this.resultSearch = document.querySelector(".live-search-results")
		this.loaderIcon = document.querySelector(".circle-loader")
		this.typingWaitTimer
		this.previousValue = ""
		
		this.event()
	}

	// live-search-results--visible

	// Events
	event() {
		this.textField.addEventListener("keyup", (e) => this.keyPressHandler())
		this.closeIcon.addEventListener("click", () => this.closeSearch())
		this.headerSearch.addEventListener("click", (e)=>{
			e.preventDefault()
			this.openOverlay()
		})
	}


	// Methods
	openOverlay() {
		this.overlay.classList.add("search-overlay--visible")
		setTimeout(()=>{
			this.textField.focus()
		}, 50)
	}

	keyPressHandler(){
		let value = this.textField.value

		if (value == ""){
			clearTimeout(this.typingWaitTimer)
			this.hideLoaderIcon()
			this.hideResultArea()
		}

		if(value != "" && value != this.previousValue){
			clearTimeout(this.typingWaitTimer)
			this.showLoaderIcon()
			this.hideResultArea()
			this.typingWaitTimer = setTimeout(() => {
				this.sendRequest()
			}, 750)
		}
		console.log(this.typingWaitTimer)

		this.previousValue = value
		// 
	}

	sendRequest(){
		axios.post("/search", {setValue: this.textField.value})
		.then((response) => {
			this.renderResultHTML(response.data)
		})
		.catch(() => {
			alert("Hello, the request has failed")
		})
		
	}

	renderResultHTML(data){
		console.log(data)
		if(data.length){
			this.resultSearch.innerHTML = `<div class="list-group-item active"><strong>Search Results</strong> (${data.length > 1 ? `${data.length} items found` : `1 item found`})</div>
            ${data.map((post) => {
            let postDate = new Date(post.createdDate)

            return `<a href="/post/${post._id}" class="list-group-item list-group-item-action" />
              <img class="avatar-tiny" src="${post.author.avatar}"></img> 
              <strong>${post.title}</strong>
              <span class="text-muted small">by ${post.author.firstname} ${post.author.lastname} on ${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}</span>
            </a>`
            }).join(" ")}
			</div>
            `
		}else{
			this.resultSearch.innerHTML = `<p class="alert alert-danger text-center shadow-sm">Sorry, we could find the value for that search</p>`
		}

		this.hideLoaderIcon()
		this.showResultArea()
	}

	showLoaderIcon(){
		this.loaderIcon.classList.add("circle-loader--visible")
	}

	hideLoaderIcon(){
		this.loaderIcon.classList.remove("circle-loader--visible")
	}

	showResultArea(){
		this.resultSearch.classList.add("live-search-results--visible")
	}

	hideResultArea(){
		this.resultSearch.classList.remove("live-search-results--visible")
	}

	closeSearch(){
		this.overlay.classList.remove("search-overlay--visible")
	}

	injectHTML(){
		document.body.insertAdjacentHTML("beforeend", `<div class="search-overlay">
		    <div class="search-overlay-top shadow-sm">
		      <div class="container container--narrow">
		        <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>
		        <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
		        <span class="close-live-search"><i class="fas fa-times-circle"></i></span>
		      </div>
		    </div>

		    <div class="search-overlay-bottom">
		      <div class="container container--narrow py-3">
		        <div class="circle-loader"></div>
		        <div class="live-search-results">
		          <div class="list-group shadow-sm">
		            
		        </div>
		      </div>
		    </div>
		  </div>`)
	}
}