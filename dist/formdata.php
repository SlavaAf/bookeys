<?php

$result = mail("sashaux@sashaux.ru","Запрос на очискту с лендинга","Нужно очистить $_POST[problem] \n\nОписание проблемы: \n$_POST[problemtext] \n\nКонтактные данные: \nгород $_POST[town] \nкомпания $_POST[company] \nимя $_POST[name] \nemail $_POST[email] \nтелефон $_POST[phone]");

if ($result) {
echo "<p>Всё в порядке</p>" ;
}
else {
echo "<p>Что-то пошло не так, пожалуйста, заполните форму повторно</p>" ;
}

?>
