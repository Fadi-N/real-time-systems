import {useState} from 'react';
import InputField from "./InputField.jsx";
import RadioOption from "./RadioOption.jsx";
import {FaCalculator} from "react-icons/fa";
import {Buffer} from 'buffer';
import ieee754 from 'ieee754';
import InfoCard from "./InfoCard.jsx";

const Ieee754 = () => {
    const [selectedValue, setSelectedValue] = useState('convertInternalToIEEE');
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const parseInput = (input) => {
        if (input.length <= 8 && /^[0-9A-F]+$/i.test(input)) {
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32BE(parseInt(input, 16), 0);
            return buffer;
        } else if (input.length === 32 && /^[01]+$/.test(input)) {
            const buffer = Buffer.alloc(4);
            for (let i = 0; i < 4; i++) {
                buffer[i] = parseInt(input.substring(i * 8, (i + 1) * 8), 2);
            }
            return buffer;
        }
        throw new Error('Invalid input format! Must be 32-bit binary or up to 8 hex digits.');
    };

    const convertToIEEE = (buffer) => {
        const ieeeNumber = ieee754.read(buffer, 0, false, 23, 4);
        return ieeeNumber.toString();
    };

    const convertToInternal = (buffer) => {
        const number = ieee754.read(buffer, 0, false, 23, 4);
        ieee754.write(buffer, number, 0, false, 23, 4);
        return Array.from(buffer)
            .map(byte => byte.toString(2).padStart(8, '0'))
            .join('');
    };

    const formatBinary = (binaryString) => {
        return binaryString.match(/.{1,4}/g).join(' ');
    };

    const handleCalculate = () => {
        const buffer = parseInput(inputValue);
        let result;
        if (selectedValue === 'convertInternalToIEEE') {
            result = convertToIEEE(buffer);
        } else {
            result = convertToInternal(buffer);
        }
        const formattedResult = formatBinary(result);
        setOutputValue(formattedResult);
    };

    return (
        <div className="flex flex-col justify-center p-4 form-container">
            <InputField
                label="Bin/HEX"
                id="bytes_in_hex"
                placeholder="10/F7"
                value={inputValue}
                onChange={handleInputChange}
            />
            <RadioOption
                id="convertInternalToIEEE"
                customClass="mt-4"
                label="Convert internal code to IEEE754"
                value="convertInternalToIEEE"
                checked={selectedValue === 'convertInternalToIEEE'}
                onChange={handleChange}
            />
            <RadioOption
                id="convertIEEEToInternal"
                customClass="mt-2"
                label="Convert IEEE754 to internal code"
                value="convertIEEEToInternal"
                checked={selectedValue === 'convertIEEEToInternal'}
                onChange={handleChange}
            />
            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    className="flex-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 flex flex-row justify-center items-center lg:float-end lg:flex-none"
                    onClick={handleCalculate}
                >
                    <FaCalculator/>
                    <span className="ml-2">Calculate</span>
                </button>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-12 border-t-2 mt-6">
                <InfoCard label="Output (Bin)" value={outputValue}/>
            </div>
        </div>
    );
};

export default Ieee754;
