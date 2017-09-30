CREATE TABLE tovars(
	tovar_id SERIAL PRIMARY KEY,
    tovar_name varchar(50) NOT NULL,
    image varchar(255) NOT NULL,
    description text NOT NULL,
    price integer NOT NULL
);


INSERT INTO tovars(tovar_name, image, description, price) VALUES('Asus Zenbook UX510UX', '/images/ux510ux.png', 'Операційна система: Windows 10
Діагональ: 15,6
Роздільна здатність: 1920x1080
Процесор: Intel Core i7-6500U
Частота, GHz: 2,5-3,1
Кількість ядер процесора: 2
Обсяг оперативної памяті, ГБ: 16
Максимальний обсяг оперативної памяті, ГБ: 16
Жорсткий диск, ГБ: 1000
SSD, ГБ: немає
Оптичний привід: немає
Графічний адаптер, обєм памяті: NVIDIA GeForce GTX 950M, 4 ГБ', 25893);
INSERT INTO tovars(tovar_name, image, description, price) VALUES('Asus X751SA', '/images/x751sa.jpg', 'Операційна система: Windows 10
Діагональ: 15,6
Роздільна здатність: 1920x1080
Процесор: Intel Pentium N3700
Частота, GHz: 2
Кількість ядер процесора: 4
Обсяг оперативної памяті, ГБ: 4
Максимальний обсяг оперативної памяті, ГБ: 4
Жорсткий диск, ГБ: 500
SSD, ГБ: немає
Оптичний привід: немає
Графічний адаптер, обєм памяті: NVIDIA GeForce GTX 920M, 4 ГБ', 10999);