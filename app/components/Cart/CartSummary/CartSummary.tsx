
import Image from "next/image";
import Button from "../../common/Button/Button";
import { ProductPropsWithQuantity } from "@/app/context/CartContext";
import { lengthBasedText } from "@/app/utils/helpers/function";

const shippingCost = 6.99;

export default function CartSummary({products,price}:{products:ProductPropsWithQuantity[],price:number}){
    const articlesLengthBasedText = lengthBasedText(products.length,"articoli","1 articolo")
    const isFreeShipping = price > 69
    const spedizione = products.length ? (isFreeShipping ? "gratuita" : shippingCost ) :  "0.00 €"
    const totalPrice = products.length ? (isFreeShipping ? price : price + 6.99 ) : 0

    // const {canceled} = await searchParams

    // if (canceled) {
    //     console.log("Cancellata");
    // }


    const handleCheckout = async ()=>{
        if (products.length === 0) {
            console.error("Il carrello è vuoto");
            return;
        }
        const response = await fetch("/api/checkout_session", {
            method:"POST",
            body:JSON.stringify({
                items: products.map(p => ({
                    code: p.code,
                    quantity: p.quantity
                })),
                shippingCost: isFreeShipping ? 0 : shippingCost
            })
        }).catch((error) => {
            console.error("Errore durante la richiesta di checkout:", error);
        });
        if (!response?.ok) {
            console.error("Errore durante la creazione della sessione di checkout");
            return;
        }
        const data = await response.json()
        if (data.url) {
            window.location.href = data.url;
        }
    }
    
    return (
            <div className="rounded-[8px] bg-[#EAEFEF] max-h-fit p-4  sticky top-[150px] left-[65vw] max-lg:static max-lg:min-w-[300px]  max-lg:w-[100%]  max-lg:m-auto">
                <div className="text-[14px] max-lg:text-[16px] text-blue-text pb-6 border-b-1 border-gray-300 flex flex-col gap-2">
                    <h2 className="font-bold">Riepilogo</h2>
                    <div className="flex items-center justify-between">
                        <span>{articlesLengthBasedText}</span>
                        <span>{parseFloat(String(price)|| "0").toFixed(2)} €</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Spedizione</span>
                        <span>{spedizione}</span>
                    </div>
                    <div className="min-md:font-bold flex items-center justify-between max-md:text-xl">
                        <span>Totale (iva incl.)</span>
                        <span>{parseFloat(String(totalPrice || "0") ).toFixed(2)} €</span>
                    </div>
                </div>
                <div className="mt-6">
                    <span className="text-[14px] text-blue-text max-md:text-[16px] max-md:font-semibold">Metodi di pagamento accettati</span>
                    <Image className="mt-4 block " src={"/assets/svg/payment-methods.svg"}  alt="Metodi di pagamento - Ottimo Caffé" width={242} height={27.7} />
                </div>
                <div className="mt-8 max-lg:flex">
                     <Button onClick={handleCheckout}>
                            Procedi al checkout
                    </Button>
                </div>
                <div className="flex justify-center gap-1 mt-3">
                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.54825 0H5.45169C3.47166 0 1.86454 1.66661 1.86454 3.71986V5.13985H1.53018C0.687902 5.13985 0 5.84649 0 6.7265V10.2933C0.000129591 13.44 2.46887 16 5.50315 16C8.53113 16 11 13.4401 11 10.2933V6.7265C11 5.84649 10.3121 5.13985 9.46982 5.13985H9.13546L9.13559 3.71986C9.13559 1.66644 7.52844 0 5.54844 0H5.54825ZM3.15028 3.71986C3.15028 2.39984 4.17878 1.33316 5.4517 1.33316H5.54825C6.82117 1.33316 7.84968 2.39984 7.84968 3.71986V5.13314H3.15042L3.15028 3.71986ZM3.47168 10.3665C3.3058 10.779 2.76381 10.9323 2.42374 10.5798C2.17931 10.352 2.16778 9.87855 2.42374 9.63988C2.67736 9.34798 3.16065 9.42042 3.33015 9.63988C3.53725 9.85451 3.55398 10.161 3.47168 10.3665ZM5.95326 10.5798C5.73294 10.8336 5.27584 10.8442 5.04685 10.5798C4.80165 10.3512 4.79167 9.87789 5.04685 9.63988C5.20652 9.43197 5.6679 9.33104 5.95326 9.63988C6.23449 9.93138 6.17293 10.375 5.95326 10.5798ZM8.57624 10.5798C8.35735 10.8318 7.92603 10.8458 7.6697 10.5798C7.43421 10.3598 7.3921 9.92789 7.6697 9.63988C7.91088 9.36236 8.39144 9.40053 8.57624 9.63988C8.85864 9.93326 8.79436 10.3761 8.57624 10.5798Z" fill="#788A8B"/>
                    </svg>
                   <span className="text-[12px] text-gray-500 text-center ">Il pagamento è sicuro</span>
                </div>
               
            </div>
    )
}
