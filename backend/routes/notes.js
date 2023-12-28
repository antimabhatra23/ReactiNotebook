/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes of using: GET /api/notes/fetchallnotes. Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Server Error");
    }
})

// Route 2: Add a new note of using: POST /api/notes/addnote. Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 chracters').isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag, } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save();

            res.json(saveNote)
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// Route 3: Update an existing note of using: PUT /api/notes/updatenote. Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4: Delete a note of using: DELETE /api/notes/deletenote. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        // Allows deletion if only user owns this Note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted successfully", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;