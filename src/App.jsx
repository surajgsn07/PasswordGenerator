import { useState , useCallback, useEffect, useRef } from 'react'
import './App.css';

function App() {
  
  const [length , setLength] = useState(8);
  const [numbers , setNumbers] = useState(false);
  const [characters , setCharacters] = useState(false);
  const [password , setPassword] = useState("");
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbers) str += "1234567890";
    if(characters) str += "#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for(let i=0; i<length ;i++){
      let ch = Math.random() *str.length + 1;
      pass += str.charAt(ch);
    }
    setPassword(pass);

  } , [length , numbers , characters , setPassword]);
  
  const passwordRef = useRef(null);

  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect(()=>{
    passwordGenerator()
  } , [length , numbers , characters , passwordGenerator])

  return (
    
    <>
      <div  className='w-full h-screen bg-black flex justify-center items-center flex-wrap '>
        <div id='maindiv' className=' p-3  bg-slate-500 h-fit flex justify-center items-center flex-col rounded-lg'>
          <h1 className='m-2 text-center font-bold text-[25px]'>Password Generator</h1>
          <div className=' w-[90%] flex justify-center mb-4 gap-2'>
            <input
            className=' w-[70%] rounded-xl p-2'
            type="text"
            value={password}
            readOnly
            placeholder='password'
            name="" id="" 
            ref={passwordRef}
            />
            <button id='copy' className= 'rounded-lg  bg-blue-800 w-[15%] p-1 text-white font-semibold '
            onClick={copyPasswordToClipboard}
            >copy</button>
          </div>
          <div className='flex items-center gap-3 font-semibold text-md flex-wrap flex-col'>
            <input
            type="range"
            max={100}
            min={6}
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}
            name="" id="" />
            <label htmlFor="" >Length : {length}</label>
            <div className='flex gap-2'>
              <input 
              type="checkbox" 
              defaultChecked={numbers}
              onChange={()=>{
                setNumbers((prev) => !prev)
              }}
              name="" id="" />
              <label htmlFor="">Numbers</label>
            </div>
            <div className='flex gap-2'>
              <input  type="checkbox" 
                defaultChecked={characters}
                onChange={()=>{
                  setCharacters((prev) => !prev)
                }
              } name="" id="" />
              <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
