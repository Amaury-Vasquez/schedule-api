import { MongoLib } from "../lib/mongo";

export class UserService {
  private collection: string;
  private mongoDB: MongoLib;

  constructor() {
    this.collection = "Users";
    this.mongoDB = new MongoLib();
  }

  async getUsers() {
    return await this.mongoDB.getAll(this.collection);
  }
}
