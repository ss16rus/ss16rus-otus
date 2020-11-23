import '@webcomponents/custom-elements/src/native-shim.js';

const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<head>
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            font-family: Roboto, Arial, sans-serif;
            outline: none;
        }
    
        #subscribe,
        #login {
            position: relative;
            top: 0;
            left: 0;
            width: 88%;
            padding: 18px 6% 10px 6%;
            border-radius: 5px;
            z-index: 2;
        }
        
        #subscribe {
            display: none;
        }
    
        .animate {
            animation-duration: 0.5s;
            animation-timing-function: ease;
            animation-fill-mode: both;
        }
    
        @keyframes fadeInLeft {
            0% {
                opacity: 0;
                transform: translateX(-20px);
            }
            100% {
                opacity: 1;
                transform: translateX(0);
            }
        }
    
        #wrapper h1 {
            font-size: 3em;
            padding-bottom: 20px;
            font-family: 'FranchiseRegular','Arial Narrow',Arial,sans-serif;
            font-weight: bold;
            text-align: center;
        }
        
        #wrapper h1:after {
            content: ' ';
            display: block;
            width: 100%;
            height: 2px;
            margin-top: 10px;
        }
    
        #wrapper p {
            margin-top: 15px;
        }
    
        #login input:not([type="checkbox"]):not([type="submit"]),
        #subscribe input:not([type="checkbox"]):not([type="submit"]) {
            width: 100%;
            margin-top: 4px;
            padding: 10px 5px 10px 32px;
        }

        [data-icon]:after {
            content: attr(data-icon);
            width: 30px;
            font-family: 'fontello';
        }
        
        p.button {
            width: 100%;
            text-align: center;
        }
    
        #login-button, #signin-button {
            padding:  5px 10px;
            margin: 10px 0;
            font-family: 'fontello';
            font-size: 1.5rem;
            cursor: pointer;
            border-radius: 3px;
            transition: all 0.2s linear;
        }
    
        .keeplogin {
            margin-top: 10px;
        }
    
        .keeplogin input,
        .keeplogin label {
            display: inline-block;
            font-size: 1rem;
            font-style: italic;
        }
    
        #loginkeeping {
            margin-right: 5px;
        }
    
        p.change_link {
            width: 100%;
            font-size: 1rem;
            text-align: right;
            border-radius: 0 0 5px 5px;
        }
    
        p.change_link > span {
            cursor: pointer;
            margin: 5px 3px;
            display: inline-block;
            font-weight: bold;
            padding: 2px 6px;
            margin-left: 10px;
            text-decoration: none;
            border-radius: 4px;
            transition: all 0.4s  linear;
        }
    
        p.change_link > span:active {
            position: relative;
            top: 1px;
        }
    
        @media (max-height: 590px) {
            #login-window {
                top: 45px;
            }
            #subscribe, #login {
                padding: 5px 6% 10px 6%;
            }
            #wrapper h1 {
                padding: 0;
                font-size: 1.7rem;
            }
            #wrapper h1::after {
                margin-top: 5px;
            }
            #wrapper p {
                margin-top: 10px;
            }
            
            #username, #password {
                padding: 4px 0 4px 32px;
            }
            .keeplogin label {
                line-height: 1rem;
                font-size: 1rem;
            }
    
            #login-button, #signin-button {
                font-size: 1.1rem;
                padding: 3px 5px;
                margin: 5px 0;
            }
    
            .change_link > span {
                font-size: 0.9rem;
            }
        }
    
        @media (max-height: 420px) {
            #login-window {
                top: 40px;
            }
            #subscribe, #login {
                width: 80%;
                padding: 0 6% 3px 6%;
            }
            #wrapper h1 {
                padding: 0;
            }
            #wrapper p {
                margin-top: 2px;
            }
            #login h1 {
                font-size: 1.6rem;
            }    
            #subscribe h1 {
                font-size: 1rem;
            } 
            #subscribe label {
                font-size: 0.8rem;
            }
            #wrapper h1:after {
                margin-top: 0;
            }
            #username, #password {
                padding: 3px 0 3px 32px;
                margin-top: 1px;
            }
            
            .keeplogin {
                line-height: 0.8rem;
            }
            
            .keeplogin label {
                line-height: 0.8rem;
                font-size: 0.8rem;
            }
    
            #login-button, #signin-button {
                font-size: 1rem;
                padding: 1px 3px;
                margin: 0px 0 8px;
            }
            #signin-button {
                margin-top: 3px;
            }
            p.change_link {
                font-size: 0.9rem;
            }
            p.change_link > span {
                margin: 2px 0;
                font-size: 0.9rem;
            }
        }
    
    
        /*************** colors *****************/
    
        #subscribe, #login {
            background: rgb(247, 247, 247);
            border: 1px solid rgba(147, 184, 189,0.8);
            box-shadow:
                0pt 2px 5px rgba(105, 108, 109,  0.7),
                0px 0px 8px 5px rgba(208, 223, 226, 0.4) inset;
        }
    
        #wrapper h1 {
            color: rgb(253, 125, 102);
            background:
            -webkit-repeating-linear-gradient(
                -45deg,
                rgb(253, 125, 102),
                rgb(255, 101, 74) 20px,
                rgb(255, 0, 0) 20px,
                rgb(253, 125, 102) 40px,
                rgb(255, 0, 0) 40px
                );
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
        }
    
        #wrapper h1:after {
            background: linear-gradient(
                to right,
                transparent 10%, 
                red 30% 60%,
                transparent 90%
            );
        }
    
        [data-icon]:after {
            color: rgb(106, 159, 171);
        }
    
        input:-moz-placeholder,
        textarea:-moz-placeholder,
        ::-webkit-input-placeholder {
            font-style: italic;
            color: rgb(190, 188, 188);
        }
    
        input {
            transition: all 0.2s linear;
            border: 1px solid rgb(178, 178, 178);
            border-radius: 3px;
            box-shadow: 0px 1px 4px 0px rgba(168, 168, 168, 0.6) inset;
        }
    
        input:hover {
            border: 1px solid rgba(91, 90, 90, 0.7);
        }
    
    
        input:active,
        input:focus {
            border: 1px solid rgb(255, 173, 173);
            box-shadow: 0px 1px 4px 0px rgb(255, 173, 173) inset;
        }
     
        p.button input {
            box-shadow:
                2px 2px 5px white inset,
                -2px -2px 1px rgba(0, 0, 0, 0.233) inset,
                2px 2px 5px rgba(0, 0, 0, 0.432);
        }
    
        p.button input:hover {
            color: rgb(255, 104, 78);
        }
    
        p.button input:active {
            text-shadow: 
                -1px -1px 1px white, 
                1px 1px 1px rgba(0, 0, 0, 0.685);
            background: rgb(235, 235, 235);
            box-shadow: 
                2px 2px 4px rgba(0, 0, 0, 0.267) inset,
                -2px -2px 2px white inset,
                1px 1px 1px rgba(0, 0, 0, 0.432);
        }
    
        p.change_link {
        color: rgb(127, 124, 124);
        background: repeating-linear-gradient(
            -45deg,
            rgb(247, 247, 247) ,
            rgb(247, 247, 247) 15px,
            rgb(225, 234, 235) 15px,
            rgb(225, 234, 235) 30px,
            rgb(247, 247, 247) 30px
        );
        }
    
        #wrapper p.change_link > span {
            border: 1px solid rgb(219, 229, 232);
            background: rgb(247, 248, 241);
            color: rgb(29, 162, 193);
        }
    
    
        #wrapper p.change_link > span:hover {

            color: rgb(57, 191, 215);
            background: rgb(247, 247, 247);
            border: 1px solid rgb(74, 179, 198);
        }
    </style>
<head>
<body>
    <div id="wrapper">
        <div id="login" class="animate form">
            <form id="login-form" autocomplete="on">
                <h1> Вход </h1>
                <p>
                    <label for="username" class="uname" data-icon="&#59392"> Ваш логин или адрес эл. почты  </label>
                    <input id="username" name="username" required type="text" placeholder="VasiliyChapaev или mymy@mail.ru"/>
                </p>
                <p>
                    <label for="password" class="yourpasswd" data-icon="&#59394"> Ваш пароль </label>
                    <input id="password" name="password" required type="password" placeholder="напр. P@ssw0rd" />
                </p>
                <p class="keeplogin">
                    <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" />
                    <label for="loginkeeping">Запомнить пароль</label>
                </p>
    
                <p class="button">
                    <input id="login-button" type="submit" value="Войти &#59393" />
                </p> 
    
                <p class="change_link">
                    Нет учетной записи?
                    <span class="to_subscribe"> Создать 
                        <span data-icon="&#62004"></span>
                    </span>
                </p>
            </form>
        </div>
    
        <div id="subscribe" class="animate form">
            <form id="subscribe-form"  autocomplete="on">
                <h1> Регистрация </h1>
                <p>
                    <label for="usernamesignup" class="uname" data-icon="&#59392"> Ваш логин </label>
                    <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername" />
                </p>
                <p>
                    <label for="emailsignup" class="youmail" data-icon="&#59395" > Ваша эл. почта </label>
                    <input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.ru"/>
                </p>
                <p>
                    <label for="passwordsignup" class="youpasswd" data-icon="&#59394"> Придумайте ваш пароль </label>
                    <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="напр. P@ssw0rd"/>
                </p>
                <p>
                    <label for="passwordsignup_confirm" class="yourpasswd" data-icon="&#59394"> Повторите ввод пароля </label>
                    <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="напр. P@ssw0rd"/>
                </p>
                <p class="button">
                    <input id="signin-button" type="submit" value="Создать"/>
                </p>
                <p class="change_link">
                    Уже регистрировались?
                    <span class="to_login"> Войти </span>
                </p>
            </form>
        </div>
    </div>
</body>`;


class MyElement extends HTMLElement {

    connectedCallback() {
        const shadow: ShadowRoot = this.attachShadow({ mode: "open" });
        shadow.appendChild( template.content.cloneNode(true));

        shadow.querySelectorAll('form').forEach( form => {
            form.addEventListener('submit', e => {
                e.preventDefault();
                e.stopPropagation();
                this.fireEvent();
            });
        });

        this.innerHTML = `
        <style>
        @font-face {
            font-family: 'fontello';
            src: url('./fonts/fontello.eot?32596926');
            src: url('./fonts/fontello.eot?32596926#iefix') format('embedded-opentype'),
                 url('./fonts/fontello.woff2?32596926') format('woff2'),
                 url('./fonts/fontello.woff?32596926') format('woff'),
                 url('./fonts/fontello.ttf?32596926') format('truetype'),
                 url('./fonts/fontello.svg?32596926#fontello') format('svg');
            font-weight: normal;
            font-style: normal;
        }
        </style>`;

        let subscribe: HTMLDivElement;
        subscribe = <HTMLDivElement>shadow.querySelector("#subscribe")!;
        let login: HTMLDivElement;
        login = <HTMLDivElement>shadow.querySelector("#login")!;

        shadow.querySelector(".to_subscribe")!.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            login.style.cssText = 'display:none;'
            subscribe.style.cssText = `
                display:inherit;
                animation-name:fadeInLeft;
                animation-delay:.1s;`;
        });
        
        shadow.querySelector(".to_login")!.addEventListener('click', e => {
            e.stopPropagation();
            e.preventDefault();
            subscribe.style.cssText = 'display:none;'
            login.style.cssText = `
                display:inherit;
                animation-name:fadeInLeft;
                animation-delay:.1s;`;
        });

        this.addEventListener('click', e => { e.stopPropagation(); });
    }
    
    
    fireEvent() : void {  
        const shadow: ShadowRoot = this.shadowRoot!;
        const nameField: HTMLInputElement = <HTMLInputElement>shadow.querySelector('#username')!;
        const passField: HTMLInputElement = <HTMLInputElement>shadow.querySelector('#password')!;
        const chkbox: HTMLInputElement = <HTMLInputElement>shadow.querySelector('#loginkeeping')!;
        const userNameSignup: HTMLInputElement = <HTMLInputElement>shadow.querySelector('#usernamesignup')!;
        const emailField: HTMLInputElement = <HTMLInputElement>shadow.querySelector('#emailsignup')!;
        const passSignUpField: HTMLInputElement = <HTMLInputElement>shadow.querySelector('#passwordsignup')!;
        const passSignUpFieldConfirm: HTMLInputElement = <HTMLInputElement>shadow.querySelector('#passwordsignup_confirm')!;

        if ( emailField.value == "") {
            this.dispatchEvent(new CustomEvent("login-event", {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: { 
                    userName: nameField.value,
                    password: passField.value,
                    rememberMe: chkbox.checked,
                }
            }));
        } else {
            this.dispatchEvent(new CustomEvent("register-event", {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: { 
                    userName: userNameSignup.value,
                    email: emailField.value,
                    newPassword: passSignUpField.value,
                    newPasswordConfirmation: passSignUpFieldConfirm.value,
                }
            }));
        }
    }
}


customElements.define("login-register-window", MyElement); 

