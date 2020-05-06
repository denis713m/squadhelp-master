CREATE TABLE "Participants"(id bigserial primary key,
                        participant1 integer references "Users"(id) not null ,
                        participant2 integer references "Users"(id) not null CHECK ( participant2 > participant1),
                        unique (participant1, participant2)
                        );

INSERT INTO "Participants"(participant1, participant2) VALUES (1, 2);

CREATE TABLE "FavorBlackListOptions" (id integer primary key CHECK ( id < 5 ),
                                        part1 bool not null ,
                                        part2 bool not null );
INSERT INTO "FavorBlackListOptions" VALUES (1, false, false);
INSERT INTO "FavorBlackListOptions" VALUES (2, false, true);
INSERT INTO "FavorBlackListOptions" VALUES (3, true, false);
INSERT INTO "FavorBlackListOptions" VALUES (4, true, true);

CREATE TABLE "Conversation" (id bigserial primary key ,
                           participants bigint references "Participants"(id) not null,
                           blackList integer references "FavorBlackListOptions"(id) default 1,
                           favoriteList integer references "FavorBlackListOptions"(id) default 1,
                           timestamp timestamp default current_timestamp);

DROP TABLE "Conversation"

INSERT INTO "Conversation" (participants, blackList, favoriteList) VALUES (3, 2, 3);
INSERT INTO "Conversation" (participants) VALUES (4);
UPDATE "Conversation" SET blackList = 4 WHERE participants = 4;

CREATE TABLE "Message" (id bigserial primary key ,
                        sender int references "Users"(id) not null ,
                        body varchar(255) not null ,
                        conversation bigint references "Conversation"(id) not null ,
                        timestamps timestamp default current_timestamp);



CREATE TABLE "Catalog" (id bigserial primary key ,
                        userId integer references "Users"(id),
                        catalogName varchar(255) not null ,
                        )
SELECT id FROM "Users" WHERE id = 11

CREATE TABLE "1Message1" (id bigserial primary key ,
                        sender int references "Users"(id) not null ,
                        body varchar(255) not null ,
                        recipients integer[] check ( checkUsers(recipients) > 0  ),
                        timestamps timestamp default current_timestamp);

INSERT INTO "1Message1" (sender, body, recipients) VALUES (1, 'sfdsgfsg', '{1,2,3}');
INSERT INTO "1Message1" (sender, body, recipients) VALUES (1, 'sfdsgfsg', '{5,2,3}');

DROP TABLE "1Message1";

SELECT exists (SELECT id FROM "Users" WHERE id = 11);

CREATE FUNCTION checkUsers(users int[]) RETURNS int AS $$
DECLARE
    "check" int := 1;
    "user" int;
BEGIN
    FOREACH "user" in ARRAY users LOOP
            IF (SELECT not exists (SELECT 1 FROM "Users" WHERE id = "user"))
                THEN
                    "check" = 0;
                    RETURN "check";
                    END IF;
        end loop;
    RETURN "check";
END;
$$ LANGUAGE plpgsql;

select checkUsers(ARRAY [1,2,3])

CREATE FUNCTION checkUsers11(users int[]) RETURNS int AS $$
DECLARE
    "check" int := 1;
    "user" int;
BEGIN
    FOREACH "user" in ARRAY users LOOP
            RAISE NOTICE 'row11 = %', "user";
        end loop;
    RETURN "check";
END;
$$ LANGUAGE plpgsql;

select checkUsers11(ARRAY [24,2,11]);
drop function updateTimestamp();
drop table "Participants"

CREATE FUNCTION updateTimestamp() RETURNS trigger AS $updateTimestamp$
BEGIN
    NEW.timestamps := current_timestamp;
    RETURN NEW;
END;
$updateTimestamp$ LANGUAGE plpgsql;


CREATE TRIGGER updateTimestamp
     BEFORE UPDATE
    ON "1Message1"
    FOR EACH ROW
EXECUTE PROCEDURE updateTimestamp();

DROP trigger updateTimestamp on "1Message1" ;
UPDATE "1Message1" SET recipients = '{3}' WHERE id = 1


CREATE TABLE "Participants1"(
                            participant1 integer references "Users"(id) not null ,
                            participant2 integer references "Users"(id) not null CHECK ( participant2 > participant1),
                            primary key (participant1, participant2)
);
drop table "Participants1";

ALTER TABLE "1Message1" RENAME recipients TO recipients1;
ALTER TABLE "1Message1" ADD test varchar references "Banks"("cardNumber");
ALTER TABLE "1Message1" DROP COLUMN test;

CREATE RULE "changeBody" AS ON UPDATE TO "1Message1"
DO ALSO
INSERT INTO "Participants"(participant1, participant2) VALUES (2,4);



DROP RULE "changeBody"  ON "1Message1";

UPDATE "1Message1" SET sender=2 WHERE id=3;

/*Fill Participants table*/
INSERT INTO "Participants" (participant1, participant2) VALUES (1,2);
INSERT INTO "Participants" (participant1, participant2) VALUES (1,3);
INSERT INTO "Participants" (participant1, participant2) VALUES (2,4);
INSERT INTO "Participants" (participant1, participant2) VALUES (1,5);
/*Fill Conversation table*/
INSERT INTO "Conversation" (participants) VALUES (1);
INSERT INTO "Conversation" (participants) VALUES (2);
INSERT INTO "Conversation" (participants) VALUES (3);
INSERT INTO "Conversation" (participants) VALUES (4);
/*Fill Catalog table*/
INSERT INTO "Catalog" (userId, catalogName, conversation) VALUES (1, 'Test', '{1,2,4}');

DROP DATABASE chat;

    db.messages.find({body: 'hello'})
db.messages.insertOne(
    {body: 'hshs',
    conversation: '5eb086facd',
    createdAt: Date(),
    sender: 3,
    updatedAt: '2020-04-15'}
    )

db.messages.insertOne(
    {body: 'H  dsgd',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )

    db.messages.insertOne(
    {body: 'er H fesr',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )
    db.messages.insertOne(
    {body: 'er H,',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )
    db.messages.insertOne(
    {body: 'erHfesr',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )
        db.messages.insertOne(
    {body: 'erH fesr',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )
        db.messages.insertOne(
    {body: 'er Hfesr',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )
            db.messages.insertOne(
    {body: 'er H!fesr',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )

            db.messages.insertOne(
    {body: 'H fesr',
        conversation: '5eb086facd',
        createdAt: Date(),
        sender: 3,
        updatedAt: '2020-11-15'}
    )

db.messages.find({body: {$regex:/\bh\b/, $options: 'i'}})