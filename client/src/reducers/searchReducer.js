import * as propertiesTypeData from '../components/search/data/propertiesTypeData';
export const searchDataInitialState = {
    region: "",
    propertyTypes: {
        apartmentsArr: new Array(propertiesTypeData.apartmentsArr.length),
        housesArr: new Array(propertiesTypeData.housesArr.length),
        othersArr: new Array(propertiesTypeData.othersArr.length)
    },
    rooms: { min: "", max: "" },
    price: { min: "", max: "" },
    apartmentCharacteristics: new Array(propertiesTypeData.apartmentCharacteristics.length),
    floor: { min: "", max: "" },
    apartmentSize: { min: "", max: "" },
    entryDate: "",
    freeText: "",
}





const searchReducer = (searchData, action) => {
    let newPropertyTypes;
    switch (action.type) {
        case "SET_REGION":
            return { ...searchData, region: action.region }
        case "SET_ALL_TYPES":
            return {
                ...searchData,
                propertyTypes: action.data ? action.data : searchDataInitialState.propertyTypes
            };
        case "SET_ENTIRE_ARR_TYPES":
            newPropertyTypes = createPropertiesTypesCopy(searchData.propertyTypes);
            newPropertyTypes[action.arrName] = action.data ? action.data : searchDataInitialState.propertyTypes[action.arrName];
            return {
                ...searchData,
                propertyTypes: newPropertyTypes
            };

        case "SET_ONE_PROPERTY":
            newPropertyTypes = createPropertiesTypesCopy(searchData.propertyTypes);
            const propertyArr = newPropertyTypes[action.arrName]
            propertyArr[action.propertyIndex] = action.propertyValue;
            return {
                ...searchData,
                propertyTypes: newPropertyTypes
            };

        case "SET_PRICE":
            return {
                ...searchData,
                price: { ...searchData.price, ...action.price }
            };
        case "SET_ROOMS":
            return {
                ...searchData,
                rooms: { ...searchData.rooms, ...action.rooms }
            };
        case "SET_APARTMENT_CHARACTERISTICS":
            const newCharacteristicsArr = [...searchData.apartmentCharacteristics]
            newCharacteristicsArr[action.index] = action.value;
            return {
                ...searchData,
                apartmentCharacteristics: newCharacteristicsArr
            };
        case "SET_FLOOR":
            return {
                ...searchData,
                floor: { ...searchData.floor, ...action.floor }
            };
        case "SET_SIZE":
            return {
                ...searchData,
                apartmentSize: { ...searchData.apartmentSize, ...action.apartmentSize }
            };
        case "SET_ENTRY_DATE":
            return {
                ...searchData,
                entryDate: action.entryDate
            };
        case "SET_FREE_TEXT":
            return {
                ...searchData,
                freeText: action.freeText
            };
        case "CLEAR_SEARCH":
            return searchDataInitialState;
            
        default:
            return { ...searchData };
    }
};



const createPropertiesTypesCopy = (data) => {
    return {
        apartmentsArr: [...data.apartmentsArr],
        housesArr: [...data.housesArr],
        othersArr: [...data.othersArr]
    }
}

export default searchReducer;