const axios = require('axios');

const splitAndMakeSearchValueBold = (searchValue, autoCompleteResult) => {
    const splitSearchValue = autoCompleteResult.replaceAll(searchValue, `**${searchValue}**`).split("**");
    return splitSearchValue.map((str) => {
        return {className: str === searchValue ? "bold": "", value: str}
    });
};


export const searchAutoComplete = async (searchValue) => {
    const autoCompleteURL = "https://es.govmap.gov.il/TldSearch/api/AutoComplete";
    try {
        const result = await axios.get(autoCompleteURL, {
            params: {
                ids: "276267023",
                gid: "govmap",
                query: searchValue,
            },
        });

        const records = result.data.res;

        const resultArray = [];
        for (let record in records) {
            let subject;
            if (record === "SETTLEMENT") subject = "עיר";
            else if (record === "STREET") subject = "רחוב";
            else if (record === "NEIGHBORHOOD") subject = "שכונה";
            else continue;

            resultArray.push({ subject, key: record, type: "autoComplete-header" })
            records[record].forEach((item, index) => {
                resultArray.push({ subject, data: splitAndMakeSearchValueBold(searchValue ,item.Value), key: item.Key, type: "autoComplete-result" });
                if (index > 3) return;
            })
        }
        return resultArray;
    } catch (err) {
        console.log("ff",err);
    }
}