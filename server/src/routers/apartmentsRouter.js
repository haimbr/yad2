const express = require("express");
const { Readable } = require('stream');
const auth = require("../middleware/auth");
const { uploadFilesToS3, getFileFromS3 } = require("../middleware/s3-handlers");
const Apartment = require("../models/apartmentModel");
const { createQuery, createSortQuery } = require("../utils/mongoDbQuery");


const router = new express.Router();




router.post('/apartments/publish', auth, async (req, res) => {
    const newAd = req.body;

    try {
        if (!newAd || !newAd.address || !newAd.aboutTheProperty || !newAd.paymentAndDates || !newAd.contactDetails) {
            throw new Error("Details are missing");
        }
        const apartment = new Apartment({
            ...newAd.address,
            ...newAd.aboutTheProperty,
            ...newAd.paymentAndDates,
            contacts: newAd.contactDetails,
            owner: req.user._id
        });
        const newApartment = await apartment.save();
        res.send(newApartment._id);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});






router.post('/apartments/publish/add-files', auth, uploadFilesToS3, async (req, res) => {

    try {
        if (!req.files) {
            throw new Error("files are missing");
        }

        const apartment = await Apartment.findOne({ _id: req.query.apartmentId, owner: req.user._id });
        const filesArr = req.files.map((file) => file.key)
        apartment.files = filesArr;
        await apartment.save();
        res.send(apartment);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});


router.post('/apartments/get-apartments', async (req, res) => {

    let searchParameters = req.body.searchParameters ? createQuery(req.body.searchParameters) : {};
    let sortParameter = createSortQuery(req.body.searchParameters?.sortParameter);
    // console.log(sortParameter);
    const result = await getAds(req, res, searchParameters, sortParameter);
    res.send(result);
});

router.get('/apartment/get-apartments-body', async (req, res) => {
    try{
        if(!req.query.apartmentId) throw new Error();
        const result = await Apartment.findOne({_id: req.query.apartmentId});
        res.send(result);
    }catch(e){
        console.log(e);
        res.status(400).send("something went wrong");
    }
})


const getAds = async (req, res, searchParameters, sortParameter) => {
    let result;
    const maxAdsInPage = 10;
    const skip = req.body.otherParameters.requestedPage - 1 || 0;
    try {
        const ads = await Apartment.find(searchParameters).skip(maxAdsInPage * skip).limit(maxAdsInPage).sort(sortParameter);
        if (req.body.otherParameters.getHeaders) {
            result = createHeadersObg(ads);
            if (req.body.otherParameters.getPagesCount) {
                result.resultsCount = await Apartment.countDocuments(searchParameters);
            }
        }
        return result;
    } catch (err) {
        res.status(400).send('something went wrong');
    }
}


const createHeadersObg = (ads) => {
    try {
        const result = {};
        result.apartmentsArr = ads.map((ad) => {
            return {
                mainImg: ad.files[0],
                propertyType: ad.typeOfProperty,
                city: ad.city,
                address: ad.street + " " + ad.houseNumber,
                roomsNum: ad.roomsNum,
                floor: ad.floor,
                size: ad.size,
                price: ad.price,
                publishedDate: ad.updatedAt.toLocaleDateString(),
                apartmentId: ad._id,
                filesNum: ad.files.length,
                contacts: ad.contacts[0]
            }
        })
        return result;
    } catch (err) {
        console.log(err)
    }

}


router.get('/get-file', getFileFromS3, async (req, res) => {
    const fileName = req.query.key.split('_')[2];
    const stream = Readable.from(req.fileBuffer);
    res.setHeader(
        'Content-Disposition',
        'inline; filename=' + fileName
    );
    stream.pipe(res);
});

router.get('/test1', async (req, res) => {
    const test = createQuery({ region: "בני ברק", typeOfProperty: "דירת נופש" })
    console.log(test);
    try {
        const result = await Apartment.find(test);
        console.log(result)
    } catch (e) {
        console.log(e);
    }
});



module.exports = router;