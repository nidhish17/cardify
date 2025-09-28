import {useEffect, useState} from "react";
import {Percent} from "lucide-react";


const RangeInput = function ({label, min=0, max=100, rangeVal=0, setRangeVal, onInputFocusout}) {
    // rangeVal and setRangeVal are global store state and func from Zustand!

    // These are the local state for input range!
    // const [rangeValue, setRangeValue] = useState(rangeVal);
    const [inputValue, setInputValue] = useState(`${rangeVal}`);

    const handleSetRange = function (e) {
        const value = Number(e.target.value);
        setRangeVal(value);
        setInputValue(`${value}`);
    }

    const handleOnBlurInput = function (e) {
        if (!e.target.value) {
            setInputValue(`${rangeVal}`);
            return;
        }
        const value = Number(e.target.value);
        onInputFocusout(value);
    }

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex justify-between items-center">
                <h6 className="font-medium text-primary-100 capitalize">{label}</h6>
                <div className="pr-1 py-0.5 ring ring-primary-500 focus-within:ring-teal-800/80 focus-within:ring-2 rounded transition-all duration-300 flex items-center">
                    <input
                        type="number" value={inputValue}
                        min={min} max={max}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleOnBlurInput}
                        className="text-center text-sm w-10 text-primary-100 outline-none"
                    />
                    <Percent size={15} className="text-primary-500" />
                </div>
            </div>

            <input
                type="range" value={rangeVal}
                min={min} max={max}
                onChange={handleSetRange}
                className=""
            />
        </div>
    )
}

export default RangeInput;