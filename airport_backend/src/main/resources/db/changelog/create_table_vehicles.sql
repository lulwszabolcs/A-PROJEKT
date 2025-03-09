create table if not exists vehicles(
    vehicle_id int not null primary key auto_increment,
    name varchar(30),
    license varchar(10),
    vehicle_type varchar(100),
    vehicle_year int,
    vehicle_status varchar(30),

    foreign key (vehicle_type) references vehicle_type(id),
    foreign key (vehicle_status) references vehicle_status(id)
);