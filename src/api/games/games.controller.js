const Game = require("./games.model");

const getAllGames = async(req,res)=>{
    try{
        const games = await Game.find();
        res.json(games);
    }catch{
        res.json("Error recovering puzzles", error);
    }
}

const getGamesByType = async(req,res)=>{
    try{
        const { type } = req.params;
        const games = await Game.find({ "type": type});
        res.json(games);
    }catch{
        res.json("Error recovering games by type", error);
    }
}

const getGamesByStatus = async(req,res)=>{
    try{
        const { status } = req.params;
        const games = await Game.find({ "status": status});
        res.json(games);
    }catch{
        res.json("Error recovering games by status", error);
    }
}

const updateGame = async(req,res)=>{
    try{
        const { id } = req.params;
        const filter = { _id: id };
        // Load the document
        const doc = await Game.findOne(filter);
    
        // Update the document using `Document#updateOne()`
        await doc.updateOne(req.body).then(
            (newGame) => {console.log(newGame)});
    }catch{
        res.json("Error recovering games by status", error);
    }
}

module.exports = {
    getAllGames,
    getGamesByType,
    getGamesByStatus,
    updateGame
};