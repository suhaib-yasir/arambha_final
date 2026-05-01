import ProgressBar from "./ProgressBar";

export default function CourseCard({course}){

const progress=course.progressPercent||0;
const completed=course.completed||false;

return(

<div className="
bg-white
rounded-3xl
shadow-lg
p-6
border
border-gray-100
hover:shadow-xl
transition
">

<div className="flex justify-between mb-4">

<div>
<h3 className="text-xl font-bold text-gray-800">
{course.title}
</h3>

<p className="text-gray-500 mt-1">
{course.videosCompleted}/{course.totalVideos} Videos
</p>

<p className="text-sm text-indigo-600 mt-2 font-semibold">
{course.credit || 1} Credit
</p>

</div>

<span className={`
px-4 py-2 rounded-full text-sm font-semibold
${completed
? "bg-green-100 text-green-700"
: "bg-blue-100 text-blue-700"
}
`}>
{completed ?
"Certificate Eligible"
:
"In Progress"}
</span>

</div>

<ProgressBar progress={progress}/>

<button
className="
mt-6
w-full
bg-gradient-to-r
from-blue-600
to-indigo-600
text-white
py-3
rounded-xl
font-semibold
"
>
{completed ?
"View Certificate"
:
"Continue Learning"}
</button>

</div>

)

}