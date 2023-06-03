const router = require('express').Router();
const Notes = require('../model/Notes');
const fetchuser = require('../middleware/fetchuser');


//Create a Task
router.post('/addnote', async(req,res)=>{
    const { title, description} = req.body;
    try {
        const newTask = new Notes({title,description});
        const saveTask = await newTask.save();
        res.status(201).json(saveTask); 
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update a Task
router.put('/updatenote/:id', async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // if (note.userId.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(202).json({ note });
    } catch (error) {
        res.status(500).json(error);
    }
})


//Read tasks

router.get('/fetchallnotes', async (req, res) => {
    try {
        const notes = await Notes.find({})
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json(error);
    }

})

//Delete a task
router.delete('/deletenote/:id', async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // if (note.userId.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Successfully Deleted", note: { note } });
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;