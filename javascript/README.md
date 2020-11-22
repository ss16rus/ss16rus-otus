 Окно формы ввода пароля или регистрации нового пользователя.
 
 Если используем node js, то потребуется установить зависимость 
 "npm i @webcomponents/custom-elements"
 Если нет, то удаляем первую строку в index.ts "import ..." и подключаем на web странице 
 <script src="https://unpkg.com/@webcomponents/custom-elements"></script> 
 до загрузки нашего модуля.
 
 Транспилируйте через webpack index.ts в index.js
  
 1. Подключите <script src="index.js"></script>
 2. Скопируйте шрифты в папку ./fonts, что бы они были доступны на страние в браузере
 3. Создайте на странице элемент <my-element></my-element>
 4. Зарегистрируйте на него (или любой другой объект) слушателя 
	document.querySelector("my-element").addEventListener("register-event", event => {});
	
При нажатии кнопки Submit, данные с формы будут доступны в event.detail как 
{ 
	userName, // имя пользователя при входе
	password, // пароль при входе
	rememberMe,	// запоминать сессию - true/false
	email, 		// почта при создании нового пользователя
	newPassword,// пароль при создании нового пользователя
	newPasswordConfirmation, // повтор пароля при создании нового пользователя
}