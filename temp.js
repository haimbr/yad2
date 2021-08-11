

const createQuery = (params) => {
    const query = [];
    if (params.region) {
        query.push({ $or: [{ city: params.region }, { street: params.region }] })
    } if (params.typeOfProperty) {
        query.push({ typeOfProperty: params.typeOfProperty })
    } if (params.rooms) {
        query.push({ rooms: { $gt: params.rooms.min, $lt: params.rooms.max } })
    } if (params.price) {
        query.push({ price: { $gt: params.price.min, $lt: params.price.max } })
    } if (params.floor) {
        query.push({ floor: { $gt: params.floor.min, $lt: params.floor.max } })
    } if (params.size) {
        query.push({ size: { $gt: params.size.min, $lt: params.size.max } })
    } if (params.apartmentProperties) {
        query.push({ apartmentProperties: { $all: params.apartmentProperties } })
    } if (params.entryDate) {
        query.push({ entryDate: { $gte: params.entryDate } })
    } if (params.apartmentProperties) {
        query.push({ apartmentProperties: { $all: params.apartmentProperties } })
    } if (params.apartmentDesc) {
        query.push({ $or: [{ apartmentDesc: { $regex: params.apartmentDesc } }, { apartmentProperties: params.apartmentDesc }] })
    }
    return {$and: query}
}