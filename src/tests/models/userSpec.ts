import User from '../../types/user.type';
import UserModel from '../../models/user.model';

const store = new UserModel();
let user: User;

describe('User Model', () => {
  describe('should have CRUD methods', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////

  it('create method should add a user', async () => {
    const result = await store.create({
      user_name: 'gamal',
      first_name: 'mostafa',
      last_name: 'ahmed',
      password: '12345678',
    });
    user = result;
    expect(result).toEqual(
      jasmine.objectContaining({
        id: user.id,
        user_name: 'gamal',
        first_name: 'mostafa',
        last_name: 'ahmed',
      })
    );
  });
  ////////////////////////////////////////////////////////////////
  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toContain(
      jasmine.objectContaining({
        id: user.id,
        user_name: 'gamal',
        first_name: 'mostafa',
        last_name: 'ahmed',
      })
    );
  });
  ////////////////////////////////////////////////////////////////
  it('show method should return the correct user', async () => {
    const result = await store.show(user.id as string);
    expect(result).toEqual(
      jasmine.objectContaining({
        id: user.id,
        user_name: 'gamal',
        first_name: 'mostafa',
        last_name: 'ahmed',
      })
    );
  });
});
