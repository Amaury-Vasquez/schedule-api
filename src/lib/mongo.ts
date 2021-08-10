import { MongoClient } from "mongodb";

import { config } from "../config";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

export class MongoLib {
  static connection: MongoClient;
  private readonly dbName: string;

  constructor() {
    this.dbName = DB_NAME;
  }

  async connect() {
    try {
      if (!MongoLib.connection) {
        const client = new MongoClient(MONGO_URI);
        MongoLib.connection = await client.connect();
        console.log("Connected to db...");
      }
    } catch (err) {
      console.error(err);
    }
    return MongoLib.connection;
  }

  async DB() {
    return (await this.connect()).db(this.dbName);
  }

  async getAll(collection: string) {
    const db = (await this.DB()).collection(collection);
    return await db.find({}).toArray();
  }
}
