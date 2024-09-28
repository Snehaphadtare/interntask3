import NavBar from "./NavBar";
import { useState, useRef } from "react";
import axios from "axios";

function Create()
{
	const rRno = useRef();
	const [rno,setRno] = useState("");
	const [name,setName] = useState("");
	const [marks,setMarks] = useState("");
	const [file,setFile] = useState("");
	const [msg,setMsg] = useState("");

	const hRno = (event) => { setRno(event.target.value);}
	const hName = (event) => { setName(event.target.value);}
	const hMarks = (event) => { setMarks(event.target.value);}
	const hFile = (event) => { setFile(event.target.files[0]);}


	const save = (event) => {
		event.preventDefault();

		let formData = new FormData();
		formData.append("rno",rno);
		formData.append("name",name);
		formData.append("marks",marks);
		formData.append("file",file);


		let url = "http://localhost:9000/save";
		axios.post(url,formData,{headers : { "Content-Type" : "multipart/form-data"},})
		.then(res=> {
			if (res.data.affectedRows == 1)
			{
				setMsg("Record Updated")
				setRno("");
				setName("");
				setMarks("");
				rRno.current.focus();
			}
			else if (res.data.code == "ER_DUP_ENTRY")
			{
				setMsg(rno + "already exists");
				setRno("");
				rRno.current.focus();
		}
	})
		.catch(err =>setMsg("issue"+err));

	}

return(
<>
<center>
	<NavBar/>
	<h1>Create Page </h1>
	<form onSubmit = { save}>
		<input type = "number" placeholder = "Enter rno"
		onChange = {hRno} value={rno} ref={rRno}/>
		<br/><br/>
		<input type = "text" placeholder = "Enter name"
		onChange = {hName} value={name}/>
		<br/><br/>
		<input type = "number" placeholder = "Enter marks"
		onChange = {hMarks} value={marks}/>
		<br/><br/>
		<input type = "file" placeholder = "select file"
		onChange = {hFile} />
		<br/><br/>
		<input type="Submit"/>
		<br/><br/>
	</form>
	<h2> { msg} </h2>
</center>
</>
);
}
export default Create;