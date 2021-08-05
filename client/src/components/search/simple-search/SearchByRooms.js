import React, { createRef, useContext, useState } from 'react'
import { setRoomsAction } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';
import useOnClickOutsideClose from '../../../hooks/useOnClickOutsideClose';
import DropDownInput from './DropDownInput'



const mobileButtons = ["6-5", "5-4", "4-3", "3-2"].reverse();


const SearchByRooms = ({ isMobileMode }) => {
    const ref = createRef();
    useOnClickOutsideClose(ref, () => setIsOpen(false));

    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const [isOpen, setIsOpen] = useState(false);
    const [isMinRoomsOpen, setIsMinRoomsOpen] = useState(false);
    const [isMaxRoomsOpen, setIsMaxRoomsOpen] = useState(false);

    const onClickRoomNumb = (num, listType) => {
        dispatchSearchData(setRoomsAction({ [listType]: num }));
        listType === 'max' ? setIsMaxRoomsOpen(false) : setIsMinRoomsOpen(false);
    }

    const onClickOpenRoomsList = (listType) => {
        const isMaxRoomsClicked = listType === 'max' ? true : false;
        setIsMaxRoomsOpen(isMaxRoomsClicked && !isMaxRoomsOpen);
        setIsMinRoomsOpen(!isMaxRoomsClicked && !isMinRoomsOpen);
    }

    const onMobileButtonsClicked = (values) => {
        const min = values.split("-")[1];
        const max = values.split("-")[0];
        dispatchSearchData(setRoomsAction({ min, max }))
    }

    const generateRoomsList = () => {
        const roomsList = [];
        roomsList[0] = "הכל";
        for (let i = 1; i <= 12; i += 0.5) {
            roomsList.push(i);
        }
        return roomsList;
    };

    return (
        <div ref={ref} className={"search-by-rooms"}>
            <div >
                <DropDownInput
                    className={"rooms__input"}
                    label={"חדרים"}
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    inputAttributes={{
                        placeholder: "חדרים",
                        disabled: "disabled",
                        value: ""
                    }}
                />
            </div>
            {isOpen || isMobileMode && <div className="rooms-dropdown" >
                <div className="">
                    <DropDownInput
                        className={"rooms__input"}
                        label={""}
                        isOpen={isMinRoomsOpen}
                        onClick={() => onClickOpenRoomsList("min")}
                        inputAttributes={{
                            placeholder: searchData.rooms.min || "מ-",
                            disabled: "disabled",
                        }}
                    />
                    {isMinRoomsOpen && <ul className="rooms-list">
                        {generateRoomsList().map((num, index) => (
                            <li key={index} onClick={() => onClickRoomNumb(num, "min")}>{num}</li>
                        ))}
                    </ul>}
                </div>
                <div className="">
                    <DropDownInput
                        className={"rooms__input"}
                        label={""}
                        isOpen={isMaxRoomsOpen}
                        onClick={() => onClickOpenRoomsList("max")}
                        inputAttributes={{
                            placeholder: searchData.rooms.max || "עד-",
                            disabled: "disabled",
                        }}
                    />
                    {isMaxRoomsOpen && <ul className="rooms-list">
                        {generateRoomsList().map((num, index) => (
                            <li key={index} onClick={() => onClickRoomNumb(num, "max")}>{num}</li>
                        ))}
                    </ul>}
                </div>
            </div>}

            {isMobileMode && <div className="mobile__buttons">
                {mobileButtons.map((item, index) => (
                    <span key={index} onClick={() => onMobileButtonsClicked(item)}>{item} חדרים</span>
                ))}
            </div>}
        </div>
    )
}

export default SearchByRooms;
