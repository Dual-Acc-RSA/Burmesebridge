import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
canAccessAdmin
} from "@/lib/permissions";

/**
后台入口保护
只有 admin/moderator
允许进入
*/

export default async function AdminPage(){

const {
data:{user}

}=await supabase.auth.getUser();

if(!user){

redirect("/");

}

const {data:profile}=await supabase
.from("profiles")
.select("role")
.eq("id",user.id)
.single();

if(
!canAccessAdmin(
profile?.role
)
){

redirect("/");

}

return(

<div>

Admin Dashboard

</div>

)

}