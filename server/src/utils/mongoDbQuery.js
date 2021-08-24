

const createQuery = (params) => {
    const query = [];
    if (params.region) {
        query.push({ $or: [{ city: params.region }, { street: params.region }] })
    } if (params.typeOfProperty?.length > 0) {
        query.push({ typeOfProperty: params.typeOfProperty })
    } if (params.rooms) {
        query.push({ roomsNum: { $gt: params.rooms.min-0.5, $lt: params.rooms.max } })
    } if (params.price) {
        query.push({ price: { $gt: params.price.min-0.5, $lt: params.price.max+0.5 } })
    } if (params.floor) {
        query.push({ floor: { $gt: params.floor.min-0.5, $lt: params.floor.max+0.5 } })
    } if (params.size) {
        query.push({ size: { $gt: params.size.min-0.5, $lt: params.size.max+0.5 } })
    } if (params.apartmentProperties.length > 0) {
        query.push({ apartmentProperties: { $all: params.apartmentProperties } })
    } if (params.entryDate) {
        query.push({ entryDate: { $gte: params.entryDate } })
    } if (params.apartmentDesc) {
        query.push({ $or: [{ apartmentDesc: { $regex: params.apartmentDesc } }, { apartmentProperties: params.apartmentDesc }] })
    }if (params.onlyWithImg) {
        query.push({'files.0': {$exists: true}})
    }if (params.onlyWithPrice) {
        query.push({price: {$gt: 0}})
    }
    return query.length > 0 ? { $and: query } : {};
}
  

const createSortQuery =(sortParameter) => {
    if(!sortParameter) return {updatedAt: -1};

    if(sortParameter === "updatedAt"){
        return {updatedAt: -1}
    }if(sortParameter === "priceDescending"){
        return {price : -1}
    }if(sortParameter === "priceAscending"){
        return {price : 1}
    }
}

module.exports = { createQuery, createSortQuery };