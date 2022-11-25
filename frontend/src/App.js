import axios from 'axios';
import React,{Component} from 'react';

class App extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append(
		"myFile",
		this.state.selectedFile,
		this.state.selectedFile.name
	);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
	
	// Request made to the backend api
	// Send formData object
	axios.post('http://localhost:8000/', formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			<img src={this.state.selectedFile}/>
			<p>File Name: {this.state.selectedFile.name}</p>
			<p>File Type: {this.state.selectedFile.type}</p>
			<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
		</div>
		);
	}
	};
	
	render() {
	
	return (
		<div>
			<h2>
			Upload your AI-Generated Image!
			</h2>

			<h4>
				Visit <a href="https://huggingface.co/spaces/stabilityai/stable-diffusion">Stable Diffusion</a> to create an AI-generated image
			</h4>

			<br></br>

			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Submit
				</button>
			</div>
		{this.fileData()}
		</div>
	);
	}
}

export default App;
