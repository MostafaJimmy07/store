import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import db from '../../database/database';
const userModel = new UserModel();

describe('User Model', () => {
  /////////////////////////////////////////////////////////////////////////////////////////
  describe('Test Methods Exist', () => {
    it('should have a create method', () => {
      expect(userModel.create).toBeDefined();
    });

    it('should have an index method', () => {
      expect(userModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(userModel.showById).toBeDefined();
    });

    it('should have a Authenticate method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////
  describe('Test User Model Logic', () => {
    const user = {
      user_name: 'testUser',
      first_name: 'Test',
      last_name: 'User',
      passwrod: '12345678',
    } as unknown as User;

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
    });
    ///////////////////////
    it('create method should add a user', async () => {
      const createdUser = await userModel.create({
        user_name: 'test2User',
        first_name: 'Test',
        last_name: 'User',
        password: '87654321',
      } as User);
      expect(createdUser).toEqual(
        jasmine.objectContaining({
          id: createdUser.id,
          user_name: 'test2User',
          first_name: 'Test',
          last_name: 'User',
        } as User)
      );
    });
    ///////////////////////
    it('index method should return a list of users', async () => {
      const users = await userModel.index();
      expect(users.length).toBe(2);
    });
    ///////////////////////
    it('show method should return the correct user', async () => {
      const specificUser = await userModel.showById(user.id as string);
      expect(specificUser.id).toBe(user.id);
      expect(specificUser.user_name).toBe(user.user_name);
      expect(specificUser.first_name).toBe(user.first_name);
      expect(specificUser.last_name).toBe(user.last_name);
    });

    ///////////////////////
    it('Authenticate method should return the Authenticated user', async () => {
      const AuthenticateUser = await userModel.authenticate(
        user.user_name,
        user.password
      );
      expect(AuthenticateUser.id).toBe(user.id);
      expect(AuthenticateUser.user_name).toBe(user.user_name);
      expect(AuthenticateUser.first_name).toBe(user.first_name);
      expect(AuthenticateUser.last_name).toBe(user.last_name);
    });
    ////////////////////////////////
    afterAll(async () => {
      const connection = await db.connect();
      await connection.query('DELETE FROM users;');
      await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');

      connection.release();
    });
  });
});
