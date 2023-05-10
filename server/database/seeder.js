import UsersTableSeeder from "./sequelize/seeders/UserTableSeeder.js";

async function seed() {
    await UsersTableSeeder();
}

seed();
