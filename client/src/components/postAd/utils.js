


const axios = require('axios');



const splitAndMakeSearchValueBold = (searchValue, autoCompleteResult, city) => {
    const removeCityHeader = autoCompleteResult.replace(city, "");
    const splitSearchValue = removeCityHeader.replaceAll(searchValue, `**${searchValue}**`).split("**");
    return splitSearchValue.map((str) => {
        return { className: str === searchValue ? "bold" : "", value: str }
    });
};


export const searchAutoCompleteCity = async (searchValue, city) => {
    const autoCompleteURL = "https://es.govmap.gov.il/TldSearch/api/AutoComplete";
    try {
        const res = await axios.get(autoCompleteURL, {
            params: {
                ids: "276267023",
                gid: "govmap",
                query: city + searchValue,
            },
        });
        const results = city === "ישוב " ? res.data.res.SETTLEMENT : res.data.res.STREET;
        const resultArr = [];

        results?.forEach((result, index) => {
            resultArr.push(splitAndMakeSearchValueBold(searchValue, result.Value, city));
        })
        return resultArr;

    } catch (err) {
        console.log("ff", err);
    }
}


export const sendNewOdToServer = async (token, newOd, files) => {

    const newOdUrl = "http://localhost:3030/apartments/publish";
    const filesUrl = "http://localhost:3030/apartments/publish/add-files";
    try {
        const apartmentId = await axios.post(newOdUrl, newOd, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log(apartmentId.data);
        console.log(apartmentId.data.apartmentId);
        await axios.post(filesUrl, files,{
            params: {
                apartmentId: apartmentId.data,
            },
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: "Bearer " + token
            }
        });                 
        return apartmentId;
    } catch (err) {
        console.log("err", err.message);
    }
}

