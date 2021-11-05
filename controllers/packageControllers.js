const Package = require('../models/Package');

// Add new package
exports.addNewPackage = async (req, res) => {
    const { title, description, thumbnail, price, location, duration } = req.body;
    try {
        const newPackage = new Package({
            title: title,
            description: description,
            thumbnail: thumbnail,
            price: price,
            location: location,
            duration: duration
        });
        await newPackage.save();

        res.status(201).json(newPackage);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Update a Package
exports.updatePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Package.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get All Packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find().sort({'createdAt': -1});
        res.status(200).json(packages);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get Single Package
exports.getSinglePackage = async (req, res) => {
    const { id } = req.params;
    try {
        const singlePackage = await Package.findById(id)
        if (singlePackage) {
            res.status(200).json(singlePackage);
        } else {
            res.status(400).json({
                message: 'Package Not Found.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Delete a Package
exports.deletePackage = async (req, res) => {
    const { id } = req.params;
    try {
        await Package.findOneAndDelete({ _id: id });
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}