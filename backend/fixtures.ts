import mongoose from 'mongoose';
import config from './config';

import User from "./models/User";
import Photo from "./models/Photo";

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

  const photo = await Photo.create([
    {
      user: user1,
      title: 'Курт Кобейн',
      image: 'fixtures/kurt.jpg',
    },
    {
      user: user1,
      title: 'Леди Гага',
      image: 'fixtures/gaga.jpg',
    },
    {
      user: user1,
      title: 'The Weeknd',
      image: 'fixtures/The_Weeknd.png',
    },
    {
      user: user2,
      title: 'Пингвин',
      image: 'fixtures/terrifiednootnoot.webp',
    },  {
      user: user2,
      title: 'Гай Юлий Цезарь',
      image: 'fixtures/cac.jpg',
    },
    {
      user: user2,
      title: 'Цирилла',
      image: 'fixtures/cirila.jpg',
    },
  ]);

  await db.close();
};

run().catch(console.log);