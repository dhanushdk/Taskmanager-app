import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBarsProgress} from '@fortawesome/free-solid-svg-icons';
class App extends Component{

constructor(props){
  super(props);
  this.state={
    notes:[]
  }
}

API_URL="http://localhost:4038/";

componentDidMount(){
  this.refreshNotes();
}

async refreshNotes(){
  fetch(this.API_URL+"api/taskmanagerapp/GetNotes").then(response=>response.json())
  .then(data=>{
    this.setState({notes:data});
  })
}

async addClick(){
  var newNotes = document.getElementById("newNotes").value;
  const data = new FormData();
  data.append("newNotes",newNotes);

  fetch(this.API_URL+"api/taskmanagerapp/AddNotes",{
    method:"POST",
    body:data
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}

async deleteClick(id){
  fetch(this.API_URL+"api/taskmanagerapp/DeleteNotes?id="+id,{
    method:"DELETE",
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshNotes();
  })
}
render() {
  const { notes } = this.state;
  return (
    <div className="App">
      <h2>TaskManager App</h2>
      <input
        className="task-input"
        id="newNotes"
        placeholder="Enter the task"
      />
      <button onClick={() => this.addClick()}>Add Task</button>
      {notes.map((note) => (
        <p key={note.id} className="task-description">
            <FontAwesomeIcon className="bar-icon" icon={faBarsProgress} /> {note.description}&nbsp;
          <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => this.deleteClick(note.id)}
          />
        </p>
      ))}
    </div>
  );
}

}
export default App;
