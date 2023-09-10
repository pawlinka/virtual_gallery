import Controller from "../controller/controller";
import Gallery from './gallery';
import Profile from "./profile";

export default class Auth {
    #container;
    constructor(container){
        this.#container = container;
        this.clearContainer();
        this.controller = new Controller(this);
        this.renderLoginForm();
    }
 clearContainer = () => {
    this.#container.innerHTML = '';
 }  
 renderAuthForm = () => {
    this.clearContainer();
    const form = document.createElement('form');
    form.classList.add('login-form');

    const tabButton = document.createElement('button');
    tabButton.setAttribute('type', 'button');
    tabButton.textContent = 'To Sign in';
    tabButton.addEventListener('click', this.renderLoginForm);
    form.appendChild(tabButton);

    const formName = document.createElement('h1');
    formName.textContent = 'Create account';
    form.append(formName);

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Email:';
    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'email');
    usernameInput.setAttribute('name', 'username');
    usernameInput.setAttribute('required', 'required');
    usernameInput.setAttribute('maxlength', '50');
    usernameLabel.appendChild(usernameInput);
    form.appendChild(usernameLabel);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('name', 'password');
    passwordInput.setAttribute('required', 'required');
    passwordInput.setAttribute('minlength', '5'); 
    passwordInput.setAttribute('maxlength', '20');
    passwordInput.setAttribute('pattern', '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,20}$');
    passwordInput.setAttribute('placeholder', 'Password should be at least 5 letters;');
    passwordInput.setAttribute('title', 'Password should be at least 5 letters;');
    passwordLabel.appendChild(passwordInput);
    form.appendChild(passwordLabel);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Sign up';
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const email = usernameInput.value;
        const password = passwordInput.value;
        this.controller.register(this.authRefresh)(email, password);
    })
    form.appendChild(submitButton);


    this.#container.appendChild(form);
};
 renderLoginForm = () => {
    this.clearContainer();
    const form = document.createElement('form');
    form.classList.add('login-form');

    const tabButton = document.createElement('button');
    tabButton.setAttribute('type', 'button');
    tabButton.textContent = 'To Sign Up';
    tabButton.addEventListener('click', this.renderAuthForm);
    form.appendChild(tabButton);


    const formName = document.createElement('h1');
    formName.textContent = 'Log into your account';
    form.append(formName);

    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Email:';
    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'email');
    usernameInput.setAttribute('name', 'username');
    usernameInput.setAttribute('required', 'required');
    usernameInput.setAttribute('maxlength', '50');
    usernameInput.setAttribute('placeholder', 'ivanov@gmail.com');
    usernameLabel.appendChild(usernameInput);
    form.appendChild(usernameLabel);

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('name', 'password');
    passwordInput.setAttribute('required', 'required');
    passwordInput.setAttribute('minlength', '5'); 
    passwordInput.setAttribute('maxlength', '20');
    passwordInput.setAttribute('pattern', '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{5,20}$');
    passwordInput.setAttribute('placeholder', 'Password should be at least 5 letters;');
    passwordInput.setAttribute('title', 'Password should be at least 5 letters;');
    passwordLabel.appendChild(passwordInput);
    form.appendChild(passwordLabel);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Log In';
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const email = usernameInput.value;
        const password = passwordInput.value;
        this.controller.login(Auth.authRefresh)(email, password);
        new Profile(document.querySelector('#page'));
        window.location.hash = "#profile";
    })
    form.appendChild(submitButton);

    this.#container.appendChild(form);
};
 static authRefresh = () => {
    const token = localStorage.getItem('user');
    const navAuth = document.querySelector('header .auth');
    const profileItem = document.createElement('li');
    const profileLink = document.createElement('a');
    profileLink.href = '#profile';
    profileLink.textContent = "My profile";
    profileLink.classList.add('profile');
    profileLink.addEventListener('click', (e) => {
        new Profile(document.querySelector('#page'));
        const links = document.querySelectorAll('.navbar a');
        links.forEach(activeLink => activeLink.classList.remove('active'));
        e.target.classList.add('active');
    })
    profileItem.append(profileLink);
    if (token) {
        navAuth.textContent = "Log Out";
        const controller = new Controller();
        navAuth.onclick = controller.logout(Auth.authRefresh);
       document.querySelector('.navbar ul').append(profileItem);
    } else {
        navAuth.textContent = "Auth";
        navAuth.href = "#auth";
        navAuth.onclick = null;
        const existProfileItem = document.querySelector('.navbar ul .profile');
        if (existProfileItem) {
            existProfileItem.remove();
        }
    }
}
}