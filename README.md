 Окно формы ввода пароля или регистрации нового пользователя.
 
 Если используем node js, то потребуется установить зависимость 
 "npm i @webcomponents/custom-elements"
 Если нет, то удаляем первую строку в index.ts "import ..." и подключаем на web странице 
 <script src="https://unpkg.com/@webcomponents/custom-elements"></script> 
 до загрузки нашего модуля.
 
 Транспилируйте через webpack index.ts в index.js
  
 1. Подключите <script src="index.js"></script>
 2. Скопируйте шрифты в папку ./fonts, что бы они были доступны на страние в браузере
 3. Создайте на странице элемент <login-register-window />
 4. Зарегистрируйте на него (или любой другой объект) слушателя 
	document.querySelector("login-register-window").addEventListener("register-event", event => {});
 5. Зарегистрируйте на него (или любой другой объект) слушателя 
	document.querySelector("login-register-window").addEventListener("login-event", event => {});
	
При нажатии кнопки Submit, данные с формы будут доступны в event.detail 
при логине:
{ 
	userName, // имя пользователя
	password, // пароль
	rememberMe,	// запоминать сессию - true/false
}
при создании нового пользователя:
{
	userName, 	// имя пользователя
	email, 		// почта
	newPassword,// пароль
	newPasswordConfirmation, // повтор пароля
}