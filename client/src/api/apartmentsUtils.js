

const axios = require('axios');
export const serverUrl = 'http://localhost:3030';


export const getApartmentBody = async (apartmentId) => {
    try {
        const result = await axios.get(serverUrl + '/apartment/get-apartments-body', { params: { apartmentId } })
        return result.data;
    } catch (err) {
        console.log(err);
    }
}

export const getApartmentsHeaders = async (searchParameters , requestedPage) => {
    try {
        const apartmentArr = await axios.post(serverUrl + '/apartments/get-apartments', {
            searchParameters: searchParameters,
            otherParameters: {
                getHeaders: true,
                getPagesCount: true,
                requestedPage: requestedPage
            }
        });
        console.log(apartmentArr);
        return apartmentArr;
    } catch (err) {
        console.log("err", err.message);
    }

}
export const searchAds = async (searchData, sortType, searchOnlyWithImg , searchOnlyWithPrice, requestedPage) => {

    let typeOfProperty = [...searchData.propertyTypes.apartmentsArr, ...searchData.propertyTypes.housesArr, ...searchData.propertyTypes.othersArr];
    typeOfProperty = typeOfProperty.filter(e => e);
    const parameters = {
        region: searchData.region,
        typeOfProperty: typeOfProperty,
        apartmentProperties: searchData.apartmentCharacteristics.filter(e => e),
        entryDate: searchData.entryDate,
        freeText: searchData.freeText,
        rooms: getMinAndMax(searchData.rooms),
        price: getMinAndMax(searchData.price),
        floor: getMinAndMax(searchData.floor),
        size: getMinAndMax(searchData.apartmentSize),
        onlyWithImg: searchOnlyWithImg,
        onlyWithPrice: searchOnlyWithPrice,
        sortParameter: sortType
    }
    const result = await getApartmentsHeaders(parameters, requestedPage);
    return result;
}

const getMinAndMax = (parameter) => {
    if (parameter.min <= 0 && parameter.max <= 0) return null;
    return { min: parameter.min || 0, max: parameter.max || 99999999 }
}