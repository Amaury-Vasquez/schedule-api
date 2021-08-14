import { MongoLib } from "../lib/mongo";
export class UserService {
  private collection: string;
  private mongoDB: MongoLib;

  constructor() {
    this.collection = "Users";
    this.mongoDB = new MongoLib();
  }

  async createMany(data: any[]) {
    const inserted = await this.mongoDB.createMany(this.collection, data);
    return inserted;
  }

  async createUser(data: {}) {
    const inserted = await this.mongoDB.createOne(this.collection, data);
    return inserted || {};
  }

  async get(query: {}) {
    const user = await this.mongoDB.getOne(this.collection, query);
    return user || {};
  }

  async getUsers() {
    const users = await this.mongoDB.getAll(this.collection);
    return users || [];
  }
}
