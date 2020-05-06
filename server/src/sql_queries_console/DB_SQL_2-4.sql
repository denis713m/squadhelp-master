/*count user by role*/
    /*Add type admin*/
    ALTER TYPE "enum_Users_role" ADD VALUE 'admin';

    /*Fill Users table with admin*/
    INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email, role)
    VALUES ('Test', 'Testovich', 'Tester', '12345', '123@mail.ru', 'admin');

    SELECT role, count(*) FROM "Users" WHERE role = 'customer' OR role = 'admin' GROUP BY role;


/*cashback 10% to all customer who made offer from 25.12 to 14.01*/
    /*create table Order*/
    CREATE TABLE "Order" (id serial primary key ,
                            userId int references "Users"(id) not null,
                            data date not null,
                            sum integer not null,
                            product varchar not null);

    /*Fill Users table with admin*/
    INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email, role, balance, rating)
    VALUES ('Buyer1', 'Buyerovich1', 'Buyer1', '12345', 'Buyer@mail.ru', 'customer', 100, 1);
    INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email, role, balance, rating)
    VALUES ('Buyer2', 'Buyerovich2', 'Buyer2', '12345', 'Buye2r@mail.ru', 'customer', 100, 1);

    /*Fill Order table*/
    INSERT INTO "Order"(userId, data, sum, product) VALUES
            (1,'2019-12-19', 20, 'soap');
    INSERT INTO "Order"(userId, data, sum, product) VALUES
            (1,'2019-12-27', 50, 'beer');
    INSERT INTO "Order"(userId, data, sum, product) VALUES
            (1,'2019-01-12', 100, 'whiskey');
    INSERT INTO "Order"(userId, data, sum, product) VALUES
            (1,'2020-01-12', 100, 'whiskey');
    INSERT INTO "Order"(userId, data, sum, product) VALUES
            (13,'2019-12-31', 100, 'presents');
    INSERT INTO "Order"(userId, data, sum, product) VALUES
            (12,'2020-02-19', 100, 'candy');

    UPDATE "Users" AS u
    SET balance = balance + 0.1 * CASH
    FROM ( SELECT userId, sum(sum) AS CASH FROM "Order"
              INNER JOIN "Users" ON "Order".userId = "Users".id
              WHERE (data BETWEEN ('2019-12-25') AND ('2020-01-14'))
                AND role = 'customer'
              GROUP BY userId) AS search
    WHERE userId = u.id;


/*Bonus to User with the biggest rating*/
    /*Add type admin*/
    ALTER TYPE "enum_Users_role" ADD VALUE 'Creative';
    /*Fill Users table with admin*/
    INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email, role, balance, rating)
    VALUES ('Test1', 'Testovich1', 'Tester1', '12345', '1231@mail.ru', 'Creative', 100, 1);
    INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email, role, balance, rating)
    VALUES ('Test2', 'Testovich2', 'Tester2', '12345', '1232@mail.ru', 'Creative', 100, 2);
    INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email, role, balance, rating)
    VALUES ('Test3', 'Testovich3', 'Tester3', '12345', '1233@mail.ru', 'Creative', 100, 3);
    INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email, role, balance, rating)
    VALUES ('Test4', 'Testovich4', 'Tester4', '12345', '1234@mail.ru', 'Creative', 100, 4);

    UPDATE "Users" SET balance = balance * 1.1
        WHERE id = ANY (SELECT id FROM "Users"
                                WHERE role = 'Creative' ORDER BY rating DESC LIMIT 3)





