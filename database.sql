Table users {
  id int [primary key]
  username varchar(20)
  password varchar(50)
  email varchar(50)
  registered_at timestamp
  newsletter bool
  card_id int
  sex_id int
  address_id int
  logged_in bool
  projects int
  //Mennyi projektben van benne
  admin int
  //Admin szintek:
  // 0 - default felhasználó
  // 1 - tudja kezelni a projekteket
  // 2 - tud felhasználói adatokat módosítani

}

Table sexs {
  id int [primary key]
  name varchar (10)
}

Table cards {
  id int [primary key]
  number varchar(24)
  cvv varchar(3)
  exp_date varchar(4)
  holder_name varchar(50)
}

Table address{
  id int [primary key]
  country int (3)
  city varchar(50)
  address varchar(60)
}

Table projects{
  id int [primary key]
  name varchar(40)
  description text
  started timestamp
  //Mikor inították
  owner_id int
  premium_level int
  //különböző előfizetési szintek
  public bool
  found_me bool
  // kaphat-e támogatást
  modified timestamp
  //mikor módosították legutóbb
  active bool
  //jelenleg aktív-e a munka
}

Table access{
  id int [primary key]
  user_id int
  project_id int
  access_level int
  // 0 - worker
  // 1 - project admin
  // 2 - co-leader
  // 3 - leader
}


//Még picit sincsen készen, sok fájl a benti gépen maradt.