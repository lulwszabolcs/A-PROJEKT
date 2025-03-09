create table if not exists problem(
    problem_id int not null primary key auto_increment,
    name varchar(50) not null,
    description varchar(100),
    datum varchar(30),
    problem_type varchar(30) not null,
    status varchar(30),
    role varchar(30),

    foreign key (problem_type) references problem_type(id),
    foreign key (status) references problem_status(id),
    foreign key (role) references role(id)
);