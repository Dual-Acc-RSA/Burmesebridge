import {
ShieldCheck,
Crown,
GraduationCap,
User,
Star,
BadgeCheck
}
from "lucide-react";

type BadgeType =
| "verified"
| "moderator"
| "admin"
| "teacher"
| "vip"
| "member";

export default function Badge({
type
}:{
type:BadgeType
}){

const badges={

verified:{
label:"Verified",
icon:BadgeCheck,
bg:"#eff6ff",
color:"#2563eb"
},

moderator:{
label:"Moderator",
icon:ShieldCheck,
bg:"#fff7ed",
color:"#f59e0b"
},

admin:{
label:"Admin",
icon:Crown,
bg:"#fef2f2",
color:"#dc2626"
},

teacher:{
label:"Teacher",
icon:GraduationCap,
bg:"#f5f3ff",
color:"#7c3aed"
},

vip:{
label:"VIP",
icon:Star,
bg:"#fff7ed",
color:"#ea580c"
},

member:{
label:"Member",
icon:User,
bg:"#f8fafc",
color:"#64748b"
}

}

const badge=
badges[type] ||
badges.member;

const Icon=
badge.icon;

return(

<span
style={{

display:"inline-flex",

alignItems:"center",

justifyContent:"center",

gap:"6px",

padding:"6px 12px",

borderRadius:999,

background:badge.bg,

color:badge.color,

fontSize:"12px",

fontWeight:700,

lineHeight:1,

height:"30px"
}}
>

<span
style={{

display:"flex",

alignItems:"center",

justifyContent:"center",

marginTop:"1px"

}}
>

<Icon
size={14}
strokeWidth={2.2}
/>

</span>

<span
style={{
display:"flex",
alignItems:"center"
}}
>

{badge.label}

</span>

</span>

)

}