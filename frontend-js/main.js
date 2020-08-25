import Search from "./modules/search"
import Chat from "./modules/chat"
import RegistrationForm from "./modules/registrationForm"


if (document.querySelector("#register-form")){new RegistrationForm()}

if (document.querySelector("#chat-wrapper")){
	new Chat()
}
new Search()