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

INSERT INTO tovars(tovar_name, image, description, price) VALUES('Asus Zenbook UX510UX', '/images/ux510ux.png', '���������� �������: Windows 10
ĳ�������: 15,6
�������� ��������: 1920x1080
��������: Intel Core i7-6500U
�������, GHz: 2,5-3,1
ʳ������ ���� ���������: 2
����� ���������� �����, ��: 16
������������ ����� ���������� �����, ��: 16
�������� ����, ��: 1000
SSD, ��: ����
�������� �����: ����
��������� �������, ��� �����: NVIDIA GeForce GTX 950M, 4 ��', 25893);
INSERT INTO tovars(tovar_name, image, description, price) VALUES('Asus X751SA', '/images/x751sa.jpg', '���������� �������: Windows 10
ĳ�������: 15,6
�������� ��������: 1920x1080
��������: Intel Pentium N3700
�������, GHz: 2
ʳ������ ���� ���������: 4
����� ���������� �����, ��: 4
������������ ����� ���������� �����, ��: 4
�������� ����, ��: 500
SSD, ��: ����
�������� �����: ����
��������� �������, ��� �����: NVIDIA GeForce GTX 920M, 4 ��', 10999);

INSERT INTO tovars(tovar_name, image, description, price) VALUES('ASUS Q551LN', '/images/q551ln.jpg', '���������� �������: Windows 8.1
ĳ�������: 15,6
�������� ��������: 1920x1080
��������: Intel Core i7-5500U
�������, GHz: Intel Core i7-5500U
ʳ������ ���� ���������: 2
����� ���������� �����, ��: 8
������������ ����� ���������� �����, ��: 8
�������� ����, ��: 1000
SSD, ��: ����
�������� �����: ����
��������� �������, ��� �����: NVIDIA GeForce 840�, 2 ��', 18753);

INSERT INTO tovars(tovar_name, image, description, price) VALUES('ASUS K501LX', '/images/k501lx.jpg', '���������� �������: Windows 8.1
ĳ�������: 15,6
�������� ��������: 1920x1080
��������: Intel Core i5-5200U
�������, GHz: 2,2-2,7
ʳ������ ���� ���������: 2
����� ���������� �����, ��: 8
������������ ����� ���������� �����, ��: 8
�������� ����, ��: 1000
SSD, ��: 128
�������� �����: ����
��������� �������, ��� �����: NVIDIA GeForce GTX 950M, 2 ��', 18250);

INSERT INTO tovars(tovar_name, image, description, price) VALUES('Asus Vivobook Pro 15 N580VD', '/images/n580vd.jpg', '���������� �������: Windows 10
ĳ�������: 15,6
�������� ��������: 1920x1080
��������: Intel Core i7-7700HQ
�������, GHz: 3,8
ʳ������ ���� ���������: 4
����� ���������� �����, ��: 8
������������ ����� ���������� �����, ��: 16
�������� ����, ��: 1000
SSD, ��: ����
�������� �����: ����
��������� �������, ��� �����: NVIDIA GeForce GTX 1050, 4 ��', 27156);

INSERT INTO tovars(tovar_name, image, description, price) VALUES('Asus Zenbook Pro UX550', '/images/ux550.jpg', '���������� �������: Windows 10
ĳ�������: 15,6
�������� ��������: 1920x1080
��������: Intel Core i7-7700HQ
�������, GHz: 3,8
ʳ������ ���� ���������: 4
����� ���������� �����, ��: 16
������������ ����� ���������� �����, ��: 16
�������� ����, ��: 1000
SSD, ��: ����
�������� �����: ����
��������� �������, ��� �����: NVIDIA GeForce GTX 1050, 4 ��', 52855);

INSERT INTO users VALUES('admin','admin','admin');
INSERT INTO users VALUES('user1','user1','simple');