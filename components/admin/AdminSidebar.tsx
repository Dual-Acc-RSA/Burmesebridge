"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
LayoutDashboard,
Users,
FileText,
Newspaper,
Shield
} from "lucide-react";

/**
后台菜单
*/

export default function AdminSidebar(){

const params=useParams();

const locale=
String(
params.locale||"my"
);

const menu=[

{
name:"Dashboard",
icon:<LayoutDashboard size={18}/>,
href:`/${locale}/admin`
},

{
name:"Users",
icon:<Users size={18}/>,
href:`/${locale}/admin/users`
},

{
name:"Posts",
icon:<FileText size={18}/>,
href:`/${locale}/admin/posts`
},

{
name:"News",
icon:<Newspaper size={18}/>,
href:`/${locale}/admin/news`
},

{
name:"Ban Center",
icon:<Shield size={18}/>,
href:`/${locale}/admin/ban`
}

]

return(

<div className="adminSidebar">

{menu.map(item=>(

<Link
key={item.href}
href={item.href}
className="adminNavItem"
>

{item.icon}

<span>

{item.name}

</span>

</Link>

))}

</div>

)

}