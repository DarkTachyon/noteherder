import React, { Component } from 'react';

import './App.css';
import Main from './Main.js'
import base from './base'

class App extends Component {
    constructor() {
        super()

        //this.setCurrentNote = this.setCurrentNote.bind(this)

        this.state = {
            notes:  {},

            currentNote: this.blankNote(),
        }
    }

    componentDidMount = () => {
        base.syncState(
            'notes',
            {
                context: this,
                state: 'notes'
            }
        )
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
        notes[this.state.currentNote.id] = null
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

        const noteData = {
            notes: this.state.notes,
            currentNote: this.state.currentNote,
        }

        return (
            <div className="App">
                <Main notes={this.state.notes}
                {...noteData}
                {...actions}
                />
                </div>
        );
      }
}

export default App;
