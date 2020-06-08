/*Create role moderator*/
ALTER TYPE "enum_Users_role" ADD VALUE 'moderator';

/*Modify user Moderator role to moderator*/
UPDATE "Users" SET role = 'moderator' WHERE "firstName" = 'Moderator';



