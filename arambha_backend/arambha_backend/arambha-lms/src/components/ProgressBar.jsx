export default function ProgressBar({
progress=0
}){

const val=Math.min(Math.max(progress,0),100);

return(
<div className="w-full">

<div className="flex justify-between mb-2">
<span className="text-sm font-medium text-gray-600">
Progress
</span>

<span className="text-sm font-semibold text-indigo-600">
{val}%
</span>
</div>

<div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
<div
className="
h-full
rounded-full
bg-gradient-to-r
from-blue-500
via-indigo-500
to-purple-600
transition-all duration-500"
style={{width:`${val}%`}}
></div>
</div>

</div>
)

}