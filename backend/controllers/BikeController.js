const Bike = require('../models/Bike');

const getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.json(bikes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bikes' });
    }
};

const getBikeById = async (req, res) => {
    const { id } = req.params;
    try {
        const bike = await Bike.findById(id).populate({
            path: "ratings",
        });
        if (!bike) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.json(bike);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bike' });
    }
};

const getBikesByDock = async (req, res) => {
    const { dock } = req.params;

    try {
        const bikes = await Bike.find({ dock: dock });

        res.json(bikes);
    } catch (error) {
        console.error('Error retrieving bikes by dock:', error);
        res.status(500).json({ error: 'Failed to retrieve bikes by dock' });
    }
};

const createBike = async (req, res) => {
    const {
        name,
        brand,
        model,
        detail,
        dock,
        imageUrls,
        price,
        discount,
        isAvailable,
        ratings
    } = req.body;
    console.log(req.body);
    try {
        const bike = await Bike.create({
            name,
            brand,
            model,
            detail,
            dock,
            imageUrls,
            price,
            discount,
            isAvailable,
            ratings
        });
        res.status(201).json(bike);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create bike' });
    }
};

const updateBikeById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const bike = await Bike.findByIdAndUpdate(id, updateData, {
            new: true
        });
        if (!bike) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.json(bike);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update bike' });
    }
};

const deleteBikeById = async (req, res) => {
    const { id } = req.params;
    try {
        const bike = await Bike.findByIdAndDelete(id);
        if (!bike) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete bike' });
    }
};

module.exports = {
    getAllBikes,
    getBikeById,
    getBikesByDock,
    createBike,
    updateBikeById,
    deleteBikeById
};
