import React, { Component } from 'react';

import './App.css';
import Main from './Main.js'

class App extends Component {
    constructor() {
        super()

        //this.setCurrentNote = this.setCurrentNote.bind(this)

        this.state = {
            notes:  {},

            currentNote: this.blankNote(),
        }
    }

    blankNote = () => {
        return {
            id: null,
            title: '',
            body: '',
        }
    }

    setCurrentNote = (note) => {
        this.setState({ currentNote: note })
    }

    resetCurrentNote = () => {
        this.setCurrentNote(this.blankNote())
    }

    saveNote = (note) => {
        const notes = {...this.state.notes}
        if (!note.id) {
            note.id = Date.now()
        }
        notes[note.id] = note
        this.setState({ notes })
        this.setCurrentNote(note)
    }

    deleteNote = () => {
        const notes = {...this.state.notes}
        delete notes[this.state.currentNote.id]
        this.setState({ notes })
        this.resetCurrentNote()
    }

    render() {
        const actions = {
            setCurrentNote: this.setCurrentNote,
            resetCurrentNote: this.resetCurrentNote,
            saveNote: this.saveNote,
            deleteNote: this.deleteNote,
        }
        return (
            <div className="App">
                <Main notes={this.state.notes}
                currentNote={this.state.currentNote}
                setCurrentNote={this.setCurrentNote}
                {...actions}
                />
                </div>
        );
      }
}

export default App;
