import Link from "next/link";

export default function Toast({quantity}:{quantity:number}){
    const ToastText = () => quantity === 1 ? <p className="text-blue-text"><span className="font-semibold">1 prodotto</span> è stato aggiunto al carrello</p> :<p className="text-blue-text"><span  className=" font-semibold">{quantity} prodotti</span> sono stati aggiunti al carrello </p>;

  return (
    <div className="toast">
        <div className="toast-container flex items-center justify-between ">
            <div className="flex items-center gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="22" height="22" rx="11" stroke="#292F6C" stroke-width="2"/>
                    <path d="M11.0909 5H12.9091L12.5455 14.7902H11.4545L11.0909 5ZM11 17.9231C11 17.6228 11.097 17.3683 11.2909 17.1594C11.497 16.9506 11.7333 16.8462 12 16.8462C12.2788 16.8462 12.5152 16.9506 12.7091 17.1594C12.903 17.3683 13 17.6228 13 17.9231C13 18.2103 12.903 18.4648 12.7091 18.6867C12.5152 18.8956 12.2788 19 12 19C11.7333 19 11.497 18.8956 11.2909 18.6867C11.097 18.4648 11 18.2103 11 17.9231Z" fill="#292F6C"/>
                </svg>
                <ToastText/>
            </div>
            <Link className='text-base font-semibold underline' href={'/carrello'}>
                <span className="text-black font-normal text-blue-text">Vai al carrello</span>
                <svg className="inline ml-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#1D1B20"/>
                </svg>
            </Link>
        </div>
    </div>
  )
}

