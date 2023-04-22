import Imiona from "../Components/BazaImion"




export default function Home() {
  return (
    <>
    <div className="justify-start h-screen px-2 py-2 m-2 flex-col flex bg-slate-200">
    <form className="flex items-center">   
    <label htmlFor="simple-search" className="sr-only">Wyszukaj</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
    </div>
    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Wyszukaj</span>
    </button>
</form>
<p className="h-2"></p>
   <ul className="flex flex-wrap text-sm font-medium text-center justify-center text-gray-500 dark:text-gray-400">
    <li className="mr-2"> 
        <a href="#" className="inline-block px-2 py-2 text-white bg-blue-600 rounded-lg active" aria-current="page">Czytam</a>
    </li>
    <li className="mr-2">
        <a href="#"  className="inline-block px-2 py-2 rounded-lg hover:text-gray-900  hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Planuje</a>
    </li>
    <li className="mr-2">
        <a href="#" className="inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Skończone</a>
    </li>
    <li className="mr-2">
        <a href="#" className="inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Porzucone</a>
    </li>
</ul>
</div>
    </>
  )
}

function NapiszImie(props: any) {
  return (
    <>
      <div className='border-gray-600 border-2 pb-0 break-words'>
        <h1 className="p-6">Witaj, jestem {props.imie}, mam {props.wiek} lat.</h1>
        <h2 className="p-2 border-gray-600 border-t-2">{props.info}</h2>
      </div>
    </>
  )
}