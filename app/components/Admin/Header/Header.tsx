import Link from "next/link";
import { usePathname } from "next/navigation";

 async function signout(){
    try {
      const res = await fetch("/auth/signout",{
        method:"POST"
      })
      if (res.ok) {
          window.location.href = "/login";
      }else{
        console.log("Error during LOGOUT");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.log("Error during LOGOUT");
    }
  }

export default function Header(){
    const pathname = usePathname()
    return (
        <header className="bg-black h-[80px] text-white flex justify-between items-center px-10">
             <button className="cursor-pointer appearance-none  border p-2 rounded-lg hover:bg-white hover:text-black transition-all" onClick={signout}>LOGOUT</button>
            <nav className="flex gap-5">
                <Link className={`${pathname === "/admin/dashboard" ? "underline" : ""}`} href={"/admin/dashboard"}>Dashboard</Link>
                <Link className={`${pathname === "/admin/products" ? "underline" : ""}`} href={"/admin/products"}>Prodotti</Link>
                <Link className={`${pathname === "/admin/products/new" ? "underline" : ""}`} href={"/admin/products/new"}>Crea Prodotto</Link>
            </nav>
        </header>
    )
}