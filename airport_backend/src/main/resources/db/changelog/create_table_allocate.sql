  create table if not exists allocate(
      role_id varchar(30) not null,
      permission_id varchar(30) not null,

      foreign key (role_id) references role(id),
      foreign key (permission_id) references permission(id)
  );