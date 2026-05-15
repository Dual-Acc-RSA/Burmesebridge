import {
Heart,
MessageCircle,
Share2
} from "lucide-react";

import IconButton from "./IconButton";

export default function PostActions(){

return(

<div
className="feedActions"
>

<IconButton
icon={<Heart size={18}/>}
label="Like"
/>

<IconButton
icon={<MessageCircle size={18}/>}
label="Comment"
/>

<IconButton
icon={<Share2 size={18}/>}
label="Share"
/>

</div>

)

}