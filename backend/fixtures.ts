import mongoose from 'mongoose';
import config from './config';

import User from "./models/User";

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (e) {
    console.log('Skipping drop...');
  }
  const user1 = new User({
    email: 'admin@mail.ru',
    password: '123',
    role: 'admin',
    displayName: 'Admin',
    avatar: 'fixtures/admin.png',
  });
  user1.generateToken();

  const user2 = new User({
    email: 'user@mail.ru',
    password: '123',
    role: 'user',
    displayName: 'User',
    avatar: 'fixtures/user.png',
  });
  user2.generateToken();

  await user1.save();

  await user2.save();

  await db.close();
};

run().catch(console.log);