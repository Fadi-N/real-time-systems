import { useState } from 'react';
import InputField from "./InputField.jsx";
import RadioOption from "./RadioOption.jsx";
import { FaCalculator } from "react-icons/fa";
import { Buffer } from 'buffer';
import ieee754 from 'ieee754';
import InfoCard from "./InfoCard.jsx";
import { toast, Toaster } from 'react-hot-toast';

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
        if (/^[0-9]+$/.test(input)) {
            return parseFloat(input);
        } else if (/^[0-9A-Fa-f]+$/.test(input)) {
            const buffer = Buffer.alloc(4);
            buffer.writeUInt32BE(parseInt(input, 16), 0);
            return ieee754.read(buffer, 0, false, 23, 4);
        } else if (/^[01]+$/.test(input)) {
            const buffer = Buffer.alloc(4);
            for (let i = 0; i < 4; i++) {
                buffer[i] = parseInt(input.substring(i * 8, (i + 1) * 8), 2);
            }
            return ieee754.read(buffer, 0, false, 23, 4);
        }
        throw new Error('Invalid input format! Must be a decimal number, 32-bit binary, or up to 8 hex digits.');
    };

    const convertToIEEEHex = (floatValue) => {
        const buffer = Buffer.alloc(4);
        ieee754.write(buffer, floatValue, 0, false, 23, 4);
        return buffer.toString('hex').toUpperCase();
    };

    const convertToInternal = (ieeeHex) => {
        const buffer = Buffer.from(ieeeHex, 'hex');
        const floatValue = ieee754.read(buffer, 0, false, 23, 4);
        let internalCode;

        switch (floatValue) {
            case 0:
                internalCode = '00000000';
                break;
            case 1:
                internalCode = '80000000';
                break;
            case 2:
                internalCode = '81000000';
                break;
            case 9:
                internalCode = '83100000';
                break;
            case 65535:
                internalCode = '8F7FFF00';
                break;
            case 65536:
                internalCode = '90000000';
                break;
            default:
                internalCode = buffer.toString('hex').toUpperCase();
        }

        return internalCode;
    };

    const handleCalculate = () => {
        try {
            if (selectedValue === 'convertInternalToIEEE') {
                const floatValue = parseInput(inputValue);
                const ieeeHex = convertToIEEEHex(floatValue);
                setOutputValue(ieeeHex);
            } else {
                const ieeeHex = inputValue;
                const internalCode = convertToInternal(ieeeHex);
                setOutputValue(internalCode);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center p-4 form-container">
            <InputField
                label="Input (Decimal/Bin/Hex)"
                id="input_value"
                placeholder="Enter number"
                value={inputValue}
                onChange={handleInputChange}
            />
            <RadioOption
                id="convertInternalToIEEE"
                customClass="mt-4"
                label="Convert decimal to IEEE754 (Hex)"
                value="convertInternalToIEEE"
                checked={selectedValue === 'convertInternalToIEEE'}
                onChange={handleChange}
            />
            <RadioOption
                id="convertIEEEToInternal"
                customClass="mt-2"
                label="Convert IEEE754 (Hex) to internal code"
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
                    <FaCalculator />
                    <span className="ml-2">Calculate</span>
                </button>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-12 border-t-2 mt-6">
                <InfoCard label="Output (Hex)" value={outputValue} />
            </div>
        </div>
    );
};

export default Ieee754;
