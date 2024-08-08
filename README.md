На главной странице у нас есть форма с двумя полями: одно для email (это обязательное поле) и второе для номера телефона. После ввода данных можно нажать на кнопку "Поиск". Когда мы жмём на кнопку "Поиск", данные отправляются на сервер. Сервер внутри себя находит нужных людей по введённым данным. Он задерживает ответ на 5 секунд, чтобы посмотреть, как это будет выглядеть в реальной ситуации. Если ввести новые данные, то предыдущий запрос будет отменён, и сервер будет искать только по последнему введённому запросу. На странице выше формы вы сможете увидеть результаты поиска, если они есть. Если возникнет ошибка, например, что-то не сработало, появится красное сообщение с просьбой попробовать снова. Вроде как всё)

Запуск проекта

Серверная часть:
1. cd backend 
2. выполните компиляцию ts в js с помощью команды "tsc" и следом запустите сервер командой "node dist/index.js"

Клиентская часть:

1. cd front
2. npm start
