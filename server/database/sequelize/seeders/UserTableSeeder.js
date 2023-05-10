import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models.js";

dotenv.config();

export default async function UsersTableSeeder() {
    console.log();
    console.log('UsersTableSeeder');

    await createDefaultAdmin();
    return true;

}

async function createDefaultAdmin () {
    let username = process.env.DEFAULT_ADMIN_USERNAME;
    let password = process.env.DEFAULT_ADMIN_PASSWORD;
    let email = process.env.DEFAULT_ADMIN_EMAIL || null;

    if(!username || !password) {
        console.log('Missing default admin required arguments');
        return false;
    }

    return await User.create({
                    username: username,
                    email: email,
                    password: bcrypt.hashSync(password, 10)
                }).then(user => {
                    console.log('Default admin created successfully');
                }).catch(error => {
                    console.log('Could not create default admin');
                    console.error(error);
                });

    // return true;
}
