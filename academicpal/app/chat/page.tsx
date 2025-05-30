'use client';

import { useState } from 'react';
import Auth from '@/components/Auth';
import Chat from '@/components/Chat';

const Home = () => {
  const [user, setUser] = useState<any>(null);

  return <div>{user ? <Chat user={user} /> : <Auth setUser={setUser} />}</div>;
};

export default Home;
