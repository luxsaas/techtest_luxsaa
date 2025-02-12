
const { MongoClient } = require("mongodb");
const { userInfo } = require("os");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

//endpoint gets all humans marked on the map
const getHuman=async(req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("Caribou");
    const data = await db.collection("Humans").find().toArray();
    if (data.length!=0) {
        res.status(200).json({
        status: 200,
        message:"Success",
        data: data,
        });
    }else{
        res.status(203).json({
            status: 203,
            message:"Invalid User",
            data: data,
        });
    } 
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
    client.close();
}

//endpoint adds coordinates of newly added human in mongodb
const addHuman = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newItem = req.body;
        await client.connect();
        const db = client.db("Caribou");
            await db.collection("Humans").insertOne({coordinates:newItem.coordinates, eLevel:newItem.eLevel, tLevel:newItem.tLevel});
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: newItem,
            })
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
};

//endpoint gets all caribous marked on the map
const getCaribou=async(req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("Caribou");
    const data = await db.collection("Caribous").find().toArray();
    if (data.length!=0) {
        res.status(200).json({
        status: 200,
        message:"Success",
        data: data,
        });
    }else{
        res.status(203).json({
            status: 203,
            message:"Invalid User",
            data: data,
        });
    } 
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
    client.close();
}

//endpoint adds caribou added on the map to mongodb
const addCaribou = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newItem = req.body;
        await client.connect();
        const db = client.db("Caribou");
            await db.collection("Caribous").insertOne({coordinates:newItem.coordinates,id:newItem.id});
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: newItem,
            })
    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
};


module.exports = {
    addHuman,getHuman,addCaribou,getCaribou
};