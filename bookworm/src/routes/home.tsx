import Imiona from "../Components/BazaImion"




export default function Home() {
  return (
    <>
   <ul className="flex flex-wrap text-sm font-medium text-center justify-center text-gray-500 dark:text-gray-400">
    <li className="mr-2"> 
        <a href="#" className="inline-block px-2 py-2 text-white bg-blue-600 rounded-lg active" aria-current="page">Czytam</a>
    </li>
    <li className="mr-2">
        <a href="#"  className="inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Planuje</a>
    </li>
    <li className="mr-2">
        <a href="#" className="inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Skończone</a>
    </li>
    <li className="mr-2">
        <a href="#" className="inline-block px-2 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">Porzucone</a>
    </li>
</ul>
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