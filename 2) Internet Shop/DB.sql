CREATE TABLE tovars(
	tovar_id SERIAL PRIMARY KEY,
    tovar_name varchar(50) NOT NULL,
    image varchar(255) NOT NULL,
    description text NOT NULL,
    price integer NOT NULL
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