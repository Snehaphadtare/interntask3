import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAs} from "file-saver";

function Home()
{
	const nav = useNavigate();
	const [info,setInfo] = useState([]);

	useEffect(()=> {
		let url = "http://localhost:9000/read";
		axios.get(url)
		.then(res=> setInfo(res.data))
		.catch(err=> console.log(err));

	},[]);

	const delStu = (rno,image) => {
		let url = "http://localhost:9000/remove";
		let d = {data:{rno,image}};
		axios.delete(url,d)
		.then(res=> {
			alert("Record Deleted");
			window.location.reload();
		})
		.catch(err => console.log(err));

	}
	
	const downloadImage = (image) => {
		let url = "http://localhost:9000/uploads/"+image;
		saveAs(url,"download");
	}

return(
<>
<center>
	<NavBar/>
	<h1> Home Page </h1>
	<table border = "5" style={{"width":"70%"}}>
		<tr>
		<th>Rno</th>
		<th>Name</th>
		<th>Marks</th>
		<th>Image</th>
		<th>Delete</th>
		<th>Download</th>
		</tr>

	{
		info.map((e)=> (
	<tr style = {{"text-align":"center"}}>
		<td> { e.rno }</td>
		<td> { e.name }</td>
		<td> { e.marks }</td>
		<td> <img src = {`http://localhost:9000/uploads/${e.image}`	}height={200}/></td>
		<td> <button onClick = { () => {
			if(window.confirm("Are you sure"))delStu(e.rno,e.image)}}>Delete</button>
	</td>
		<td><button onClick = {() => {downloadImage(e.image);} }> Download</button>
	</td>
		</tr>
	
	))

	}
	</table>
</center>
</>
);
}
export default Home;
