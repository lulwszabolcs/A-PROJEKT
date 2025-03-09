create table if not exists image(
    image_id int not null primary key auto_increment,
    image_name varchar(30),
    image_path varchar(30),
    worker_id int,

    foreign key (worker_id) references workers(worker_id)
);