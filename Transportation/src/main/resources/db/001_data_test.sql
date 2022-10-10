
INSERT INTO users(email,password,role)values ('tc@gmail.com','$2a$10$hCbcQyiyEN41I.njXSrZYezg/5vZNVYOl/r.Iu8CypsCjISm0Yszq','TRANSPORTER');
INSERT INTO transporter(company_name,phone_number,user_id) values('Transportation company(1)','73829174891',1);


INSERT INTO users(email,password,role)values ('vladburylo@gmail.com','$2a$10$hCbcQyiyEN41I.njXSrZYezg/5vZNVYOl/r.Iu8CypsCjISm0Yszq','CUSTOMER');
INSERT INTO customer(firstname,lastname,phone_number,user_id) values('vlad','burylo','0961436383',2);

INSERT INTO users(email,password,role)values ('vitaliyvolovnik@gmail.com','$2a$10$hCbcQyiyEN41I.njXSrZYezg/5vZNVYOl/r.Iu8CypsCjISm0Yszq','ADMIN');
INSERT INTO customer(firstname,lastname,phone_number,user_id) values('vitaliy','volovnik','0961436383',2);


INSERT INTO delivery(departure_address_city, departure_address_country, departure_address_street, destination_address_city, destination_address_country, destination_address_street, departure_date, arrival_date,description,customer_id,state) values('Ternopil','Ukraine','Shewchnka 12', 'Lviv','Ukraine','Levi Ukrainku 11', '2022-09-08 16:50:21.955149', '2022-09-08 16:50:21.955149','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur cupiditate distinctio eum natus qui sunt ut velit! Ad animi, impedit libero omnis sapiente sed voluptas! Quibusdam reiciendis sunt ut!',1,'OFFER_ACCEPTED' );
INSERT INTO cargo(cargo, weight, unit_of_measurement,delivery_id)values ('bike 0', 10.0, 'pieces',1);
INSERT INTO cargo(cargo, weight, unit_of_measurement,delivery_id)values ('bike 1', 10.0, 'pieces',1);
INSERT INTO cargo(cargo, weight, unit_of_measurement,delivery_id)values ('bike 2', 10.0, 'pieces',1);
INSERT INTO cargo(cargo, weight, unit_of_measurement,delivery_id)values ('bike 3', 10.0, 'pieces',1);

INSERT INTO offer(information,price,delivery_id,transporter_id) values('we can do this work',1500,1,1);