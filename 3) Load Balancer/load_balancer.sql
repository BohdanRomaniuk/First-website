CREATE TABLE users(
	user_name varchar(50) PRIMARY KEY,
    user_password varchar(50) NOT NULL,
    user_role varchar(10) NOT NULL DEFAULT 'simple'
);

INSERT INTO users VALUES('admin','admin','admin');
INSERT INTO users VALUES('user1','user1','simple');

CREATE TABLE tasks (
	task_id SERIAL PRIMARY KEY,
	username varchar(50) NOT NULL,
	task_input_matrix text NOT NULL,
	task_input_vector text NOT NULL,
	task_result text NOT NULL DEFAULT 'виконання даного завдання було скасовано',
	task_date date NOT NULL
);