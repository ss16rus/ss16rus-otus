Сущности:

1. Товар ( напр. компьютер, принтер, ноут и проч.) - GraphQLObjectType
  1. ID - GraphQLString
  2. Группа товаров ( напр. компьютеры, принтеры, ноуты и проч.) - GraphQLObjectType
  3. Наименование ( напр. (Z0488856) Miditower: Core i9-9900KF/ 2 x 32 Гб/ 2 Тб + 512 Гб SSD/ 8 Гб Quadro RTX4000/ 1 Гбит/ Win10 Pro ) - GraphQLString
  4. Производитель ( напр. 	НИКС) - GraphQLString
  5. Цена? ( напр. 188 322 руб.) - GraphQLString

2. Группа товаров ( компьютеры, принтеры и проч.) - GraphQLObjectType
  1. ID - GraphQLString
  1. Наименование  - GraphQLString
  2. Список товаров ( несортированный ) - GraphQLList

3. Фирма производитель - GraphQLObjectType
  1. ID - GraphQLString
  2. Группы товаров - GraphQLList




Запросы:

1. Получить все группы товаров
2. Получить все группы товаров по производителю
3. Получить товар
4. Добавить товар в корзину
5. Просмотреть корзину
6. Оформить заказ

Типа админка:
5. Добавить товар
6. Удалить товар

Запускаем - node shop.js
http://192.168.1.11:5000/shop.html
