CREATE TABLE tovars(
	tovar_id SERIAL PRIMARY KEY,
    tovar_name varchar(50) NOT NULL,
    image varchar(255) NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
	action integer DEFAULT 0
);

CREATE TABLE buckets(
    bucket_id SERIAL PRIMARY KEY,
	username varchar(50) NOT NULL,
    tovar_id integer NOT NULL,
    cancel boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE users(
	username varchar(50) PRIMARY KEY,
    userpassword varchar(50) NOT NULL,
    userrole varchar(10) NOT NULL
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

INSERT INTO tovars(tovar_name, image, description, price, action) VALUES('ASUS Q551LN', '/images/q551ln.jpg', 'Операційна система: Windows 8.1
Діагональ: 15,6
Роздільна здатність: 1920x1080
Процесор: Intel Core i7-5500U
Частота, GHz: Intel Core i7-5500U
Кількість ядер процесора: 2
Обсяг оперативної памяті, ГБ: 8
Максимальний обсяг оперативної памяті, ГБ: 8
Жорсткий диск, ГБ: 1000
SSD, ГБ: немає
Оптичний привід: немає
Графічний адаптер, обєм памяті: NVIDIA GeForce 840м, 2 ГБ', 18753, 25);

INSERT INTO tovars(tovar_name, image, description, price) VALUES('ASUS K501LX', '/images/k501lx.jpg', 'Операційна система: Windows 8.1
Діагональ: 15,6
Роздільна здатність: 1920x1080
Процесор: Intel Core i5-5200U
Частота, GHz: 2,2-2,7
Кількість ядер процесора: 2
Обсяг оперативної памяті, ГБ: 8
Максимальний обсяг оперативної памяті, ГБ: 8
Жорсткий диск, ГБ: 1000
SSD, ГБ: 128
Оптичний привід: немає
Графічний адаптер, обєм памяті: NVIDIA GeForce GTX 950M, 2 ГБ', 18250);

INSERT INTO tovars(tovar_name, image, description, price, action) VALUES('Asus Vivobook Pro 15 N580VD', '/images/n580vd.jpg', 'Операційна система: Windows 10
Діагональ: 15,6
Роздільна здатність: 1920x1080
Процесор: Intel Core i7-7700HQ
Частота, GHz: 3,8
Кількість ядер процесора: 4
Обсяг оперативної памяті, ГБ: 8
Максимальний обсяг оперативної памяті, ГБ: 16
Жорсткий диск, ГБ: 1000
SSD, ГБ: немає
Оптичний привід: немає
Графічний адаптер, обєм памяті: NVIDIA GeForce GTX 1050, 4 ГБ', 27156, 12);

INSERT INTO tovars(tovar_name, image, description, price, action) VALUES('Asus Zenbook Pro UX550', '/images/ux550.jpg', 'Операційна система: Windows 10
Діагональ: 15,6
Роздільна здатність: 1920x1080
Процесор: Intel Core i7-7700HQ
Частота, GHz: 3,8
Кількість ядер процесора: 4
Обсяг оперативної памяті, ГБ: 16
Максимальний обсяг оперативної памяті, ГБ: 16
Жорсткий диск, ГБ: 1000
SSD, ГБ: немає
Оптичний привід: немає
Графічний адаптер, обєм памяті: NVIDIA GeForce GTX 1050, 4 ГБ', 52855, 23);

INSERT INTO users VALUES('admin','admin','admin');
INSERT INTO users VALUES('user1','user1','simple');