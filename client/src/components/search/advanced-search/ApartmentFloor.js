import React, { createRef, useContext, useState } from 'react'
import { setFloorAction } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';
import useOnClickOutsideClose from '../../../hooks/useOnClickOutsideClose';
import DropDownInput from '../simple-search/DropDownInput'

const ApartmentFloor = () => {
    const ref = createRef();
    const { searchData, dispatchSearchData } = useContext(SearchContext);
    useOnClickOutsideClose(ref, () => {setIsMinFloorOpen(false); setIsMaxFloorOpen(false)});

    const [isMinFloorOpen, setIsMinFloorOpen] = useState(false);
    const [isMaxFloorOpen, setIsMaxFloorOpen] = useState(false);

    const generateFloorsList = () => {
        const floorsList = [];
        floorsList[0] = "הכל";
        floorsList[1] = "מרתף/פרטר";
        for (let i = 0; i <= 17; i++) {
            floorsList.push(i);
        }
        return floorsList;
    };

    const onClickFloorNumb = (num, listType) => {
        dispatchSearchData(setFloorAction({ [listType]: num }));
        listType === 'max' ? setIsMaxFloorOpen(false) : setIsMinFloorOpen(false);
    }

    const onClickOpenFloorsList = (listType) => {
        const isMaxFloorsClicked = listType === 'max' ? true : false;
        setIsMaxFloorOpen(isMaxFloorsClicked && !isMaxFloorOpen);
        setIsMinFloorOpen(!isMaxFloorsClicked && !isMinFloorOpen);
    }


    return (
        <div className="apartment-floor" ref={ref}>
            <div className="">
                <DropDownInput
                    className={"floors__input"}
                    label={"קומה"}
                    isOpen={isMinFloorOpen}
                    onClick={() => onClickOpenFloorsList("min")}
                    inputAttributes={{
                        placeholder: searchData.floor.min || "מ-",
                        disabled: "disabled",
                    }}
                />
                {isMinFloorOpen && <ul className="floors-list">
                    {generateFloorsList().map((num, index) => (
                        <li key={index} onClick={() => onClickFloorNumb(num, "min")}>{num}</li>
                    ))}
                </ul>}
            </div>
            <div className="">
                <DropDownInput
                    className={"floors__input"}
                    label={""}
                    isOpen={isMaxFloorOpen}
                    onClick={() => onClickOpenFloorsList("max")}
                    inputAttributes={{
                        placeholder: searchData.floor.max || "עד-",
                        disabled: "disabled",
                    }}
                />
                {isMaxFloorOpen && <ul className="floors-list">
                    {generateFloorsList().map((num, index) => (
                        <li key={index} onClick={() => onClickFloorNumb(num, "max")}>{num}</li>
                    ))}
                </ul>}
            </div>

        </div>
    )
}

export default ApartmentFloor;
