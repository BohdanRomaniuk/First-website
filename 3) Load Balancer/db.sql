CREATE TABLE users(
	user_name varchar(50) PRIMARY KEY,
    user_password varchar(50) NOT NULL,
    user_role varchar(10) NOT NULL DEFAULT 'simple'
);

INSERT INTO users VALUES('admin','admin','admin');
INSERT INTO users VALUES('user1','user1','simple');