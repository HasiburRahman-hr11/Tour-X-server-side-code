const { addNewPackage, updatePackage, getAllPackages, getSinglePackage, deletePackage } = require('../controllers/packageControllers');

const router = require('express').Router();

// Create new package
router.post('/api/packages/add' , addNewPackage);


// Update new package
router.put('/api/packages/:id' , updatePackage);


// Get All Packages
router.get('/api/packages' , getAllPackages);


// Get Single Package
router.get('/api/packages/:id' , getSinglePackage);


// Delete Package by Id
router.delete('/api/packages/:id' , deletePackage);

module.exports = router;