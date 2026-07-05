import { useState } from "react";

function ClubDashboard() {

const [form,setForm]=useState({

title:"",
description:"",
club_name:"",
department:"",
location:"",
event_date:"",
registration_deadline:""

});

const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};

const handleSubmit=async(e)=>{

e.preventDefault();

const res=await fetch("http://localhost:5000/api/events",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});

if(res.ok){

alert("Event Added Successfully");

setForm({

title:"",
description:"",
club_name:"",
department:"",
location:"",
event_date:"",
registration_deadline:""

});

}else{

alert("Unable to Add Event");

}

};

return(

<div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">

<h1 className="text-3xl font-bold text-blue-600 mb-6">
Club Dashboard
</h1>

<form onSubmit={handleSubmit} className="space-y-4">

<input
name="title"
placeholder="Event Title"
value={form.title}
onChange={handleChange}
className="w-full border p-2 rounded"
/>

<select
name="club_name"
value={form.club_name}
onChange={handleChange}
className="w-full border p-2 rounded"
>

<option value="">Select Club</option>

<option>YRC</option>
<option>NSS</option>
<option>NCC</option>
<option>NSO</option>
<option>IT</option>
<option>CSE</option>
<option>Mechanical</option>
<option>ECE</option>

</select>

<textarea
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
className="w-full border p-2 rounded"
/>

<input
name="department"
placeholder="Department"
value={form.department}
onChange={handleChange}
className="w-full border p-2 rounded"
/>

<input
name="location"
placeholder="Location"
value={form.location}
onChange={handleChange}
className="w-full border p-2 rounded"
/>

<input
type="date"
name="event_date"
value={form.event_date}
onChange={handleChange}
className="w-full border p-2 rounded"
/>

<input
type="date"
name="registration_deadline"
value={form.registration_deadline}
onChange={handleChange}
className="w-full border p-2 rounded"
/>

<button
className="bg-blue-600 text-white px-6 py-2 rounded"
>

Add Event

</button>

</form>

</div>

);

}

export default ClubDashboard;