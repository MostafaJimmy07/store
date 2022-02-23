import Product from '../types/product.type';
import db from '../database/database';

class ProductModel {
  ////////////////////////////////CREATE PRODUCT/////////////////////////////////////////////////////
  async create(product: Product): Promise<Product> {
    try {
      const connect = await db.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING * ';

      const result = await connect.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const newProduct = result.rows[0];
      connect.release();
      return newProduct;
    } catch (err) {
      throw new Error(`Cannot add product ${product.name}: ${err}`);
    }
  }
  /////////////////////////////////SHOW PRODUCTS///////////////////////////////////////////////////////
  async index(): Promise<Product[]> {
    try {
      const connect = await db.connect();
      const sql = `SELECT * FROM products`;
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find users. ${err}`);
    }
  }
  ///////////////////////////////SHOW PRODUCT BY ID////////////////////////////////////////////////////////
  async showById(id: string): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`);
    }
  }
}

export default ProductModel;
