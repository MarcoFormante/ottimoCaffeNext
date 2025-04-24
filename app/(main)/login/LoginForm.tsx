'use client'

import {  useState } from 'react'
import { login} from '../../lib/action'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [error,setError] = useState("")
    const [isPending,setIsPending]=useState(false)
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setIsPending(true)
      const formData = new FormData(event.currentTarget);
      const error = await login(null, formData);
      if (!error) {
        router.push('/'); 
      } else {
        setError(error || "")
        setIsPending(false)
      }
    }
  

    if (isPending) {
        return (
            <div className='flex flex-col w-full h-[100vh] justify-center items-center'>
                <div className='text-3xl '>LOADING</div>
            </div>
        )
    }

  return (
    <div className='p-10 container'>
        <form className='flex flex-col  gap-3.5' onSubmit={(e)=>handleSubmit(e)}   >
            LOGIN ADMIN
            <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input className='border max-w-[300px]' id="email" name="email" type="email" required autoComplete={"username"} />
            </div>  
            <div className='flex flex-col'>
                <label htmlFor="password">Password:</label>
                <input className='border max-w-[300px]' id="password" name="password" type="password" required autoComplete={"current-password"} />
            </div>
            <div>
                <button  className='appearance-none border rounded-lg px-6 py-2 bg-primary text-white cursor-pointer'>Log in</button>
            </div>
        </form>
      {error &&   <p className='mt-10 text-2xl w-fit p-2 text-primary'>{error}!</p>}
    </div>
  )
}