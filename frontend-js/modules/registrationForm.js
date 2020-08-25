import axios from "axios"

export default class RegistrationForm {
	constructor(){
		this.allField = document.querySelectorAll(".form-style .form-control")
		this.insertValidationElement()
		this.username = document.querySelector("#firstname")
		this.username.previousValue = ''
		this.lastname = document.querySelector("#lastname")
		this.lastname.previousValue = ''
		this.email = document.querySelector("#email")
		this.email.previousValue = ""
		this.event()
	}

	// Events
	event(){
 		this.username.addEventListener("keyup", () => {
			 this.isDifferent(this.username, this.usernameHandler)
		 })
		this.lastname.addEventListener("keyup", () => {
			this.isDifferent(this.lastname, this.lastnameHandler)
		})
		this.email.addEventListener("keyup", () => {
			this.isDifferent(this.email, this.emailHandler)
		})
	}

	// Methods
	isDifferent(el, handler){
		if(el.previousValue != el.value){
			handler.call(this)
		}
		el.previousValue = el.value 
		console.log(el.previousValue)
	}
	usernameHandler(){
		this.username.errors = false
		this.usernameImmediately()
		clearTimeout(this.username.timer)
		this.username.timer = setTimeout(() => this.usernameAfterDelay(), 800)
	} 

	usernameImmediately(){
		if(this.username.value != "" && !/^([a-zA-Z0-9]+)$/.test(this.username.value)){
			this.showValidationError(this.username, "Username can only contain letters and numbers")
		}
		
		if(this.username.value.length > 30){
			this.showValidationError(this.username, "Username cannot contain more than 30 characters")
		}

		if(!this.username.errors){
			this.hideValidationError(this.username)
		}
	}

	hideValidationError(el){
		el.previousElementSibling.classList.remove("elementVisible")
	}

	showValidationError(el, message){
		el.previousElementSibling.innerHTML = message
		el.previousElementSibling.classList.add("elementVisible")
		el.errors = true

	}

	usernameAfterDelay(){
		if(this.username.value != "" && this.username.value.length < 3){
			this.showValidationError(this.username, "Username must contain more than 3 characters")
		}

		if(!this.username.errors){
			axios.post('/isUsernameExist', {username: this.username.value}).then(response => {
				if(response.data){
					this.showValidationError(this.username, "Username has been taken")
					this.username.isUnique = false
				}else{
					this.username.isUnique = true
				}
			})
		}

	}

	lastnameHandler(){
		this.lastname.errors = false
		this.lastnameImmediately()
		clearTimeout(this.lastname.timer)
		this.lastname.timer = setTimeout(() => this.lastnameAfterDelay(), 800)
	} 

	lastnameImmediately(){
		if(this.lastname.value != "" && !/^([a-zA-Z0-9]+)$/.test(this.lastname.value)){
			this.showValidationError(this.lastname, "Lastname can only contain letters and numbers")
		}
		
		if(this.lastname.value.length > 30){
			this.showValidationError(this.lastname, "Lastname cannot contain more than 30 characters")
		}

		if(!this.lastname.errors){
			this.hideValidationError(this.lastname)
		}
	}
	lastnameAfterDelay(){
		if(this.lastname.value != "" && this.lastname.value.length < 3){
			this.showValidationError(this.lastname, "Lastname must contain more than 3 characters")
		}

		if(!this.lastname.errors){
			axios.post('/isLastnameExist', {lastname: this.lastname.value}).then(response => {
				console.log(response.data)
				if(response.data){
					this.showValidationError(this.lastname, "Lastname has been taken")
					console.log("Lastname already exist")
					this.lastname.isUnique = false
				}else{
					console.log("username do not exist yet")
					this.lastname.isUnique = true
				}
			})
		}

	}

	emailHandler(){
		this.email.errors = false
		clearTimeout(this.email.timer)
		this.email.timer = setTimeout(() => this.emailAfterDelay(), 800)
	}

	emailAfterDelay(){
		if(this.email.value != "" && !/^\S+@\S+$/.test(this.email.value)){
			this.showValidationError(this.email, "Please enter valid email address")
		}else{
			this.hideValidationError(this.email)

		}

		if(!this.email.errors){
			axios.post('/isEmailExist', {email: this.email.value}).then(response => {
				console.log(response.data)
				if(response.data){
					this.showValidationError(this.email, "Email has been used by another user")
					console.log("Email already exist")
					this.email.isUnique = false
				}else{
					console.log("email do not exist yet")
					this.email.isUnique = true
					this.hideValidationError(this.email)
				}
			})
		}

	}


	insertValidationElement(){

		this.allField.forEach((element)=>{
			// liveValidateMessage--visible
			// elementVisible
			 element.insertAdjacentHTML("beforebegin", "<div class='alert alert-danger small elementHidden' style='margin-bottom: 0;padding: 8px 15px;'>Hello</div>")
		})
	}
}