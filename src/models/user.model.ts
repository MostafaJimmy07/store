import User from '../types/user.type';
import db from '../database/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltrounds = process.env.SALT_ROUNDS;

class UserModel {
  //////////////////////////////////CREATE USER////////////////////////////////////////////////////////
  async create(user: User): Promise<User> {
    const { user_name, first_name, last_name } = user;

    try {
      //open conn with DB
      const connect = await db.connect();
      const sql = `INSERT INTO users (user_name , first_name , last_name ,password) 
                   VALUES ($1,$2,$3,$4) returning * `;
      //run query
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltrounds as string)
      );
      const result = await connect.query(sql, [
        user_name,
        first_name,
        last_name,
        hash,
      ]);
      //realease conn
      connect.release();
      //return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to create (${user.user_name}):${(error as Error).message}`
      );
    }
  }
  //////////////////////////////////SHOW ALL USERS////////////////////////////////////////////////////
  async index(): Promise<User[]> {
    try {
      const connect = await db.connect();
      const sql = `SELECT * FROM users`;
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find users. ${err}`);
    }
  }
  /////////////////////////////GET SPECIFIC USER BY ID//////////////////////////////////////////////////////
  async showById(id: string): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. ${err}`);
    }
  }
  ///////////////////////////GET SPECIFIC USER BY USER_NAME OR ID//////////////////////////////////////////////
  async show(value: number | string): Promise<User> {
    const column = typeof value == 'number' ? 'id' : 'user_name'; // detect query attribute
    const sql = `SELECT * FROM users WHERE ${column} = $1`;
    const result = await db.query(sql, [value]);
    return result.rows[0];
  }

  //////////////////////////////////authenticate user/////////////////////////////////////////////////

  async authenticate(user_name: string, password: string) {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users WHERE user_name=($1)';
      const result = await conn.query(sql, [user_name]);
      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        if (!user) {
          return null;
        }
        const match = bcrypt.compareSync(password + pepper, user.password);
        if (!match) {
          return null;
        }
        return user;
      }
      return null;
    } catch (err) {
      throw new Error(`Authentication failed. ${err}`);
    }
  }
}
export default UserModel;
