import React, {useState, useEffect} from 'react';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'


const NotePage = ({match, history}) => {

  let noteId = match.params.id
	let [note, setNote] = useState(null)

	useEffect(()=> {
		getNote()
	}, [noteId])

	let getNote = async()=> {
		if(noteId === 'new') return

		let response = await fetch(`/api/notes/${noteId}`)
		let data = await response.json()
		setNote(data)
	}

	let createNote = async()=> {
		fetch(`/api/notes/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(note)
		})
	}

	let updateNote = async()=> {
		fetch(`/api/notes/${noteId}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(note)
		})
	}

	let deleteNote = async()=> {
		fetch(`/api/notes/${noteId}`, {
			method:'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		history.push('/')
	}

	let handleSubmit = ()=> {
		if(noteId !== 'new' && note.body === ''){
			deleteNote()
		} else if(noteId !== 'new'){
			updateNote()
		} else if(noteId === 'new' && note.body !== null){
			createNote()
		}
		history.push('/')
	}

	let handleChange = (value)=> {
		setNote(note => ({...note, 'body': value}))
	}

  return (
  	<div className='note'>
		  <div className='note-header'>
				<h3>
						<ArrowLeft onClick={handleSubmit}/>
				</h3>
				{noteId !== 'new' ? (
					<button onClick={deleteNote}>Deletar</button>
				) : (
					<button onClick={handleSubmit}>Salvar</button>
				)}
		  </div>
		<textarea onChange={(e)=> { handleChange(e.target.value) }} value={note?.body} />
  	</div>
  )
};

export default NotePage;
