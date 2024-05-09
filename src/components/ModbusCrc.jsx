import React, {useState} from 'react';
import {aCRCHi, aCRCLo} from "../../constants/index.js";
import InputField from "./InputField.jsx";
import {FaCalculator} from "react-icons/fa";
import InfoCard from "./InfoCard.jsx";

const ModbusCrc = () => {
    const [inputHex, setInputHex] = useState("");
    const [iteration, setIteration] = useState("");
    const [crcResult, setCrcResult] = useState({
        hex: "",
        totalTime: "",
        iterationTime: ""
    })

    const handleHexChange = (e) => {
        const {value} = e.target;
        let formattedValue = value.replace(/\s+/g, '').replace(/(.{2})/g, '$1 ').trim();
        setInputHex(formattedValue);
    };

    const hexStringToByteArray = (value) => {
        let cleanedValue = value.replace(/\s+/g, '');
        let data = [];
        for (let i = 0; i < cleanedValue.length; i += 2) {
            data.push(parseInt(cleanedValue.substring(i, i + 2), 16));
        }
        return data;
    }

    const calculateCRC = (data) => {
        let HiByte = 0xFF;
        let LoByte = 0xFF;
        let Index;
        data.forEach(b => {
            Index = (HiByte ^ b) & 0xFF;
            HiByte = (LoByte ^ aCRCHi[Index]) & 0xFF;
            LoByte = aCRCLo[Index];
        });
        return [(HiByte & 0xFF), (LoByte & 0xFF)];
    }

    const formatTime = (duration) => {
        const milliseconds = duration / 1000000;
        return `${milliseconds.toFixed(6)} ms`;
    }

    const handleButtonClick = () => {
        const data = hexStringToByteArray(inputHex);
        const iterations = parseInt(iteration) || 1;
        const startTime = performance.now();

        let crc;
        for (let i = 0; i < iterations; i++) {
            crc = calculateCRC(data);
        }

        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const iterationTime = totalTime / iterations;

        console.log(totalTime, iterationTime)

        setCrcResult({
            hex: crc.map(b => b.toString(16).padStart(2, '0')).join(' ').toUpperCase(),
            totalTime: formatTime(totalTime * 1000),
            iterationTime: formatTime(iterationTime * 1000)
        });
    }


    return (
        <div className="flex flex-col justify-center min-h-screen">
            <InputField
                label="Sequence of bytes in the notation hexadecimal"
                id="bytes_in_hex"
                value={inputHex}
                onChange={handleHexChange}
                placeholder="01 10 00 11 00 03 06 1A C4 BA D0"
            />
            <InputField
                label="Number of iterations"
                id="number_of_iterations"
                value={iteration}
                onChange={(e) => setIteration(e.target.value)}
                placeholder="10"
            />
            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 flex flex-row justify-center items-center"
                    onClick={handleButtonClick}
                >
                    <FaCalculator/>
                    <span className="ml-2">Calculate</span>
                </button>
            </div>
            <div className="flex flex-row gap-12">
                <InfoCard label="CRC (HEX)" value={crcResult.hex}/>
                <InfoCard label="Total time" value={crcResult.totalTime}/>
                <InfoCard label="Iteration time" value={crcResult.iterationTime}/>
            </div>
        </div>
    )
};

export default ModbusCrc;