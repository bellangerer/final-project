CREATE TABLE users (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name varchar(30) NOT NULL,
password_hash varchar(30) NOT NULL,
user_name varchar(30) NOT NULL,
email varchar(30) NOT NULL,
profile_picture_url varchar(200)
);

 INSERT INTO users
(name, password_hash, user_name, email, profile_picture_url)
VALUES
('Julia Müller', 'xxx', 'juliaGoesWorldwide', 'julia.müller09@gmail.com', 'https://images.pexels.com/photos/3646160/pexels-photo-3646160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
('Emma DeLeon', 'xxx', 'emmatraps', 'emma.deleon@hotmail.com', 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
('Sophia Marie Auer', 'xxx', 'sophia.marie01', 'sophia-marie@gmail.com', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800')
('Julian Hochauer', 'xxx', 'mr.worldwide', 'juian-hochauer2.0@gmail.com', 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')

SELECT * FROM users;
