import express from 'express';
import vendor from '../models/Vendor.js';

const router = express.Router();

// search route
router.get('/query'), async (req,res)=>{
    const {query} = req.query;
    console.log(query);
    if(!query){
        return res.status(400).json({message: "Query is required"});
    }else{
        try {
            const vendors = await vendor.find({$text: {$search: query}});
            return res.status(200).json(vendors);
        } catch (error) {
            res.status(400).json({error: "No vendors found"});
        }
    }
}

export default router;
// Description: This file contains the search route that searches for vendors based on the query provided.
// The route uses the query parameter to search for vendors in the database.
// If the query is not provided, it returns an error message.
// If vendors are found based on the query, it returns the list of vendors.
// If no vendors are found, it returns an error message.
// The search route is exported to be used in the main index.js file.
// The search route is used in the main index.js file to handle search requests from the client.