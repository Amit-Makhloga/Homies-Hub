const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Homies:Homies@cluster0.ldwvo9p.mongodb.net/HomiesHub?retryWrites=true&w=majority&appName=Cluster0"



const mongoDB = async () => {
        await mongoose.connect(mongoURI);
        
        console.log("connected");
        const fetched_data = mongoose.connection.db.collection("food_items")
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;
        // console.log(data)

        const foodCategory = mongoose.connection.db.collection("food_category")
        const  catData = await foodCategory.find({}).toArray()
        global.food_category= catData;
        // console.log(catData)

        
    
};



module.exports = mongoDB;