"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import {
  BadgeCheck,
  Crown,
  Shield,
  GraduationCap,
  Star,
  UserRound
} from "lucide-react";

type BadgeType =
  | "verified"
  | "moderator"
  | "admin"
  | "teacher"
  | "vip"
  | "member";

export default function Badge({
  type,
}:{
  type:BadgeType
}){

const params=useParams();

const locale=String(
params.locale||"en"
);

const [show,setShow]=useState(false);

const labels={

my:{
verified:"အတည်ပြုပြီး",
moderator:"စီမံခန့်ခွဲသူ",
admin:"အက်မင်",
teacher:"ဆရာ",
vip:"VIP",
member:"အသင်းဝင်"
},

zh:{
verified:"已认证",
moderator:"版主",
admin:"管理员",
teacher:"老师",
vip:"VIP",
member:"会员"
},

en:{
verified:"Verified",
moderator:"Moderator",
admin:"Admin",
teacher:"Teacher",
vip:"VIP",
member:"Member"
}

};

const text=
labels[
locale as keyof typeof labels
] || labels.en;

const badges={

verified:{
icon:<BadgeCheck size={16}/>,
color:"#2563eb"
},

moderator:{
icon:<Shield size={16}/>,
color:"#f59e0b"
},

admin:{
icon:<Crown size={16}/>,
color:"#dc2626"
},

teacher:{
icon:<GraduationCap size={16}/>,
color:"#7c3aed"
},

vip:{
icon:<Star size={16}/>,
color:"#d97706"
},

member:{
icon:<UserRound size={16}/>,
color:"#64748b"
}

};

const item=
badges[type] ||
badges.member;

return(

<div
style={{
position:"relative",
display:"inline-block"
}}

onMouseEnter={()=>
setShow(true)
}

onMouseLeave={()=>
setShow(false)
}

onClick={()=>
setShow(!show)
}

>

<div
style={{
display:"flex",
alignItems:"center",
justifyContent:"center",
width:34,
height:34,
borderRadius:"999px",
background:"white",
color:item.color,

boxShadow:
`0 0 14px ${item.color}55`,

cursor:"pointer",

transition:
"all .25s"
}}
>

{item.icon}

</div>

{show && (

<div
style={{

position:"absolute",

top:"-42px",

left:"50%",

transform:
"translateX(-50%)",

background:"#0f172a",

color:"white",

padding:"6px 10px",

borderRadius:"10px",

fontSize:"12px",

fontWeight:700,

whiteSpace:"nowrap",

zIndex:9999
}}
>

{text[type]}

</div>

)}

</div>

)

}