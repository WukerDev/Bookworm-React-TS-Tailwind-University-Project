import { Tabs, Card, Button } from "flowbite-react";
import { useState, useEffect } from 'react';

import BookList from '../Components/Menu';
import selectedItem from '../Components/Menu';
import MyComponent from "../Components/test";













export default function Home() {
  return (
    <>
    <div className="justify-start h-max min-h-screen px-2 py-2 m-2 flex-col flex bg-slate-200 gap-1">

<BookList/>


<MyComponent/>

</div>
    </>
  )
}

