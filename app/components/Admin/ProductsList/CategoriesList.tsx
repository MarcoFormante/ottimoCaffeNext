
const list:string[] = [
    "IMG","Nome","SLUG","Codice","Descrizione","Categoria","Prezzo","Offerta","Stato","Modifica","Preview","Elimina"
]


export default function CategoriesList(){
    return (
        <thead>
                <tr>
                    {list.map((item)=>{
                        return (
                            <th key={item} className="p-4 border-b border-slate-200 bg-slate-50">
                                <p className="text-sm font-normal leading-none text-slate-500">
                                    {item}
                                </p>
                            </th>
                        )
                    })}
                </tr>
        </thead>
    )
}