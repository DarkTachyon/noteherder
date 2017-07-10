import React, { Component } from 'react';

import './App.css';
import Main from './Main.js'
import base, { auth } from './base'
import SignIn from './SignIn'

class App extends Component {
    constructor() {
        super()

        //this.setCurrentNote = this.setCurrentNote.bind(this)

        this.state = {
            notes:  {},
            currentNote: this.blankNote(),
            uid: null,
        }
    }

    componentWillMount = () => {
        this.getUserFromLocalStorage()
        auth.onAuthStateChanged(
            (user) => {
                if (user) {
                    // signed in
                    this.handleAuth(user)
                }
                else {
                    // signed out
                    this.setState({ uid: null })
                }
            }
        )
    }

    getUserFromLocalStorage = () => {
        const uid = localStorage.getItem('uid')
        if (!uid)
            return
        this.setState({ uid })
    }

    syncNotes = () => {
        base.syncState(
            `notes/${this.state.uid}`,
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

    handleAuth = (user) => {
        localStorage.setItem('uid', user.id)
        this.setState(
            { uid: user.uid },
            this.syncNotes
        )
    }

    handleUnauth = () => {
        localStorage.removeItem('uid')

        if (this.bindingRef) {
            base.removeBinding(this.bindingRef)
        }

        this.setState({
            uid: null,
            notes: {}
        })

        this.resetCurrentNote()
    }

    signedIn = () => {
        return this.state.uid
    }

    signOut = () => {
        auth.signOut()
    }

    render() {
        const actions = {
            setCurrentNote: this.setCurrentNote,
            resetCurrentNote: this.resetCurrentNote,
            saveNote: this.saveNote,
            deleteNote: this.deleteNote,
            signOut: this.signOut
        }

        const noteData = {
            notes: this.state.notes,
            currentNote: this.state.currentNote,
        }

        return (
            <div className="App">
                {
                    this.signedIn()
                    ? <Main {...noteData} {...actions} />
                    : <SignIn />
                }
                </div>
        );
      }
}

export default App
