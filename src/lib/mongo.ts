import { MongoClient, ObjectId } from "mongodb";

import { config } from "../config";
import { UserData } from "../interfaces/index";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

export class MongoLib {
  static connection: MongoClient;
  private readonly dbName: string;

  constructor() {
    this.dbName = DB_NAME;
  }

  private async connect() {
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

  private async DB() {
    return (await this.connect()).db(this.dbName);
  }

  async createMany(collection: string, data: any[]) {
    const db = (await this.DB()).collection(collection);
    return await db.insertMany(data);
  }

  async createOne(collection: string, data: {}) {
    const db = (await this.DB()).collection(collection);
    return await db.insertOne(data);
  }

  async getAll(collection: string) {
    const db = (await this.DB()).collection(collection);
    const users = await db.find({}).toArray();
    return users.map((user) => {
      const { _id, email, schedule, username } = user;
      return { _id, email, schedule, username };
    });
  }

  async getOne(collection: string, query: {}) {
    const db = (await this.DB()).collection(collection);
    const user = await db.findOne(query);
    if (user) {
      const { _id, email, schedule, username } = user;
      return { _id, email, schedule, username };
    }
    return undefined;
  }
}
