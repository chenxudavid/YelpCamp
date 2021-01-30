const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost: 27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "conecction error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            // Your USER ID
            author: '60065a00dc389e3eac4b1801',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam soluta blanditiis eos autem minus asperiores nesciunt sed, consequatur incidunt quibusdam aperiam deserunt sunt explicabo doloremque quo vero? Voluptatem, nobis porro?',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dlko8bm6x/image/upload/v1611273626/YelpCamp/b9tkq5fsbcjdmegde1cs.jpg',
                    filename: 'YelpCamp/b9tkq5fsbcjdmegde1cs'
                },
                {
                    url: 'https://res.cloudinary.com/dlko8bm6x/image/upload/v1611273627/YelpCamp/ioiirdpuzxh4hxxbfpvl.jpg',
                    filename: 'YelpCamp/ioiirdpuzxh4hxxbfpvl'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
