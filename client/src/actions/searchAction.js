

export const setRegionAction = (region) => ({
    type: "SET_REGION",
    region
});

export const setAllPropertiesAction = (data) => ({
    type: "SET_ALL_TYPES",
    data
});



export const setEntirePropertiesArrAction = (arrName, data) => ({
    type: "SET_ENTIRE_ARR_TYPES",
    arrName,
    data
});



export const setOnePropertyAction = (arrName, propertyIndex, propertyValue) => ({
    type: "SET_ONE_PROPERTY",
    arrName,
    propertyIndex,
    propertyValue
});



export const setPriceAction = (price) => ({
    type: "SET_PRICE",
    price
});


export const setRoomsAction = (rooms) => ({
    type: "SET_ROOMS",
    rooms
});


export const setApartmentCharacteristics = (index, value) => ({
    type: "SET_APARTMENT_CHARACTERISTICS",
    index,
    value
});

export const setFloorAction = (floor) => ({
    type: "SET_FLOOR",
    floor
});


export const setSizeAction = (apartmentSize) => ({
    type: "SET_SIZE",
    apartmentSize
});


export const setEntryDateAction = (entryDate) => ({
    type: "SET_ENTRY_DATE",
    entryDate
});


export const setFreeTextAction = (freeText) => ({
    type: "SET_FREE_TEXT",
    freeText
});


export const clearSearchAction = () => ({
    type: "CLEAR_SEARCH",
});


