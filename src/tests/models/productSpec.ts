import db from '../../database/database';
import ProductModel from '../../models/product.model';
import Product from '../../types/product.type';
const productModel = new ProductModel();
describe('Product Model', () => {
  /////////////////////////////////////////////////////////////////////////////////////////
  describe('Test Methods Exist', () => {
    it('should have a create method', () => {
      expect(productModel.create).toBeDefined();
    });

    it('should have an index method', () => {
      expect(productModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(productModel.showById).toBeDefined();
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////
  describe('Test Product Model Logic', () => {
    const product = {
      name: 'Apple12',
      price: 2000,
      category: 'Mobile',
    } as unknown as Product;

    beforeAll(async () => {
      const createdProduct = await productModel.create(product);
      product.id = createdProduct.id;
    });

    ////////////////////////
    it('create method should add a product', async () => {
      const createdProduct = await productModel.create({
        name: 'Apple13',
        price: 3000,
        category: 'Mobile',
      } as Product);
      expect(createdProduct).toEqual(
        jasmine.objectContaining({
          id: createdProduct.id,
          name: 'Apple13',
          price: 3000,
          category: 'Mobile',
        } as Product)
      );
    });
    /////////////////////
    it('index method should return a list of products', async () => {
      const products = await productModel.index();
      expect(products.length).toBe(2);
    });
    /////////////////////
    it('show method should return the correct product', async () => {
      const specificProduct = await productModel.showById(product.id as string);
      expect(specificProduct.id).toBe(product.id);
      expect(specificProduct.name).toBe(product.name);
      expect(specificProduct.price).toBe(product.price);
      expect(specificProduct.category).toBe(product.category);
    });
    /////////////////////
    afterAll(async () => {
      const connection = await db.connect();
      await connection.query('DELETE FROM products;');
      await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');

      connection.release();
    });
  });
});
