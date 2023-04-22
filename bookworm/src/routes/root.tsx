import Test from '../Components/Nav/Nav'
import Footer from '../Components/Footer/Footer'
import Imiona from '../Components/BazaImion'
import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  useEffect(() => {
    document.title = `Bookworm By Wiktor & Sebastian`;
  });
    return (
        <>
            <Outlet />
        </>
    )
}