import React, { useState } from 'react';
import { Button, ListItem, ListItemText, ListItemSecondaryAction, List, Dialog, DialogActions, DialogTitle, DialogContent, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';

// function component
function Todo(props) {  
    
    const [confirm, setConfirm] = useState(false);
    const [form, setForm] = useState(false);
    const [inputs, setInputs] = useState(props.todo.todo.text);

    const updateTodo = () => {
        // merge is mean not overide/reset data
        db.collection('todos').doc(props.todo.id).set({
            text: inputs
        }, {merge: true});
        setForm(false);
    }

    return (
        <div>
            <List>
                <ListItem>
                    <ListItemText
                    primary={props.todo.todo.text} secondary={props.todo.id+' - '+ Date(props.todo.todo.timestamp)}
                    />
                    <ListItemSecondaryAction>
                      
                        <Button variant="contained" color="primary" onClick={event => setForm(true)} >< DeleteForeverIcon /> Edit</Button>
                        <Button variant="contained" color="secondary" onClick={event => setConfirm(true)} >< DeleteForeverIcon /> Delete</Button>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>

            <Dialog
                open={confirm}
                onClose={event => setConfirm(false)}
                aria-labelledby="confirm-modal-title"
                id={'confirm-'+props.todo.id}
           
            >
                <DialogTitle id="alert-dialog-title">Are you sure delete this one?</DialogTitle>
               
                <DialogActions>
                    <Button onClick={event => setConfirm(false)} color="primary">
                        Cancel
                    </Button>
                
                    <Button variant="contained" color="secondary" onClick={event => db.collection('todos').doc(props.todo.id).delete() && setConfirm(false)} >Confirm</Button>

                </DialogActions>
            </Dialog>

            <Dialog open={form} onClose={event => setForm(false)} aria-labelledby="form-dialog-title" id={'form-'+props.todo.id} >
                <DialogTitle id="form-dialog-title">Rename Todo ID:{props.todo.id}</DialogTitle>
                <DialogContent>
                
                <TextField
                    autoFocus
                    margin="dense"
                    id={props.todo.id}
                    label="text"
                    value={inputs}
                    type="text"
                    onChange={event => setInputs(event.target.value)}
                    fullWidth

                />
                </DialogContent>
                <DialogActions>
                <Button onClick={event => setForm(false)} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={updateTodo} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default Todo;