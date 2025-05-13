create table users(
	id serial ,
	email varchar(50) unique not null,
	password varchar(100) not null check (length(password)>6),
	is_admin boolean default false,
	created_at timestamp default now(),
	updated_at timestamp default null,
	primary key(id) 
);
create table events(
	id serial primary key,
	event_name text not null , 
	description text not null,
	event_time timestamp not null,
	venue text not null
);
create table events_images(
	id serial primary key,
	image_location text not null unique ,
	event_id int   not null references events(id) on delete cascade  
);
create table tags(
	id serial primary key ,
	name varchar(30) not null unique 
);
create table event_tags(
	tag_id int references tags(id) on delete cascade ,
	event_id int references events(id) on delete cascade ,
	primary key (tag_id,event_id)
);
create table user_events(
	user_id int references users(id) ,
	event_id int references events(id)  on delete cascade
)