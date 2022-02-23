import Product from '../../types/product.type';
import ProductModel from '../../models/product.model';
const store = new ProductModel();
let product: Product;

describe('Product Model', () => {
  describe('should have CRUD methods', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.showById).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  });
  ////////////////////////////////////////////////////////////////
  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Apple12',
      price: 2000,
      category: 'mobile',
    });
    product = result;
    expect(result).toEqual({
      id: product.id,
      name: 'Apple12',
      price: 2000,
      category: 'mobile',
    });
    product = result;
  });
  ////////////////////////////////////////////////////////////////
  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: product.id,
        name: 'Apple12',
        price: 2000,
        category: 'mobile',
      },
    ]);
  });
  ////////////////////////////////////////////////////////////////
  it('show method should return the correct product', async () => {
    const result = await store.showById(product.id as string);
    expect(result).toEqual({
      id: product.id,
      name: 'Apple12',
      price: 2000,
      category: 'mobile',
    });
  });
});
