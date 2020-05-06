/*Table of all participants in conversations. To decrease quantity of variants idParticipant2
  should be greater then idParticipant1, according to this in addMessage used participants.sort()*/
CREATE TABLE "Participants"(id bigserial primary key,
                            participant1 integer references "Users"(id) not null ,
                            participant2 integer references "Users"(id) not null CHECK ( participant2 > participant1),
                            unique (participant1, participant2)
);
/*Table with all variants black/favorite relations*/
CREATE TABLE "FavorBlackListOptions" (id integer primary key CHECK ( id < 5 ),
                                      part1 bool not null ,
                                      part2 bool not null );
INSERT INTO "FavorBlackListOptions" VALUES (1, false, false);
INSERT INTO "FavorBlackListOptions" VALUES (2, false, true);
INSERT INTO "FavorBlackListOptions" VALUES (3, true, false);
INSERT INTO "FavorBlackListOptions" VALUES (4, true, true);

/*Table conversation*/
CREATE TABLE "Conversation" (id bigserial primary key ,
                             participants bigint references "Participants"(id) not null,
                             blackList integer references "FavorBlackListOptions"(id) default 1,
                             favoriteList integer references "FavorBlackListOptions"(id) default 1,
                             createdAt timestamp default current_timestamp,
                             updatedAt timestamp default current_timestamp);
/*Table Message*/
CREATE TABLE "Message" (id bigserial primary key ,
                        sender int references "Users"(id) not null ,
                        body varchar(255) not null ,
                        conversation bigint references "Conversation"(id) not null ,
                        createdAt timestamp default current_timestamp,
                        updatedAt timestamp default current_timestamp);

/*Table Catalog*/
    /*Table Catalog contain array of conversations, so first creat function to check
      conversation existence*/
    CREATE FUNCTION checkConvers(convers bigint[]) RETURNS bool AS $$
    DECLARE
        "talk" bigint;
    BEGIN
        FOREACH "talk" in ARRAY convers LOOP
                IF (SELECT not exists (SELECT 1 FROM "Conversation" WHERE id = "talk"))
                THEN
                    RETURN false;
                END IF;
            end loop;
        RETURN true;
    END;
    $$ LANGUAGE plpgsql;

CREATE TABLE "Catalog" (id bigserial primary key ,
                        userId int references "Users"(id) not null ,
                        catalogName varchar(255) not null ,
                        conversation bigint[] not null check ( checkConvers(conversation) ),
                        createdAt timestamp default current_timestamp,
                        updatedAt timestamp default current_timestamp);

/*Create trigger to change updatedAt on update to repeat behavior Mongoose table*/
    CREATE FUNCTION updateTimestamp() RETURNS trigger AS $updateTimestamp$
    BEGIN
        NEW.updatedAt := current_timestamp;
        RETURN NEW;
    END;
    $updateTimestamp$ LANGUAGE plpgsql;

CREATE TRIGGER updateTimestamp
    BEFORE UPDATE
    ON "Catalog"
    FOR EACH ROW
EXECUTE PROCEDURE updateTimestamp();

CREATE TRIGGER updateTimestamp
    BEFORE UPDATE
    ON "Conversation"
    FOR EACH ROW
EXECUTE PROCEDURE updateTimestamp();

CREATE TRIGGER updateTimestamp
    BEFORE UPDATE
    ON "Message"
    FOR EACH ROW
EXECUTE PROCEDURE updateTimestamp();




