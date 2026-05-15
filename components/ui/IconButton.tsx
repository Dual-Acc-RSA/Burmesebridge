import { ReactNode } from "react";

type Props={
icon:ReactNode;
label:string;
onClick?:()=>void;
};

export default function IconButton({
icon,
label,
onClick
}:Props){

return(

<button
onClick={onClick}
style={{
display:"flex",
alignItems:"center",
gap:"8px",

padding:"10px 14px",

border:"none",

background:"transparent",

cursor:"pointer",

borderRadius:"12px",

color:"#64748b",

fontWeight:600,

transition:".2s"
}}
>

{icon}

{label}

</button>

)

}