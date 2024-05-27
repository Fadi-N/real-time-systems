import React, {useState} from 'react';
import InputField from "./InputField.jsx";
import {FaCalculator} from "react-icons/fa";
import InfoCard from "./InfoCard.jsx";

const CanCrc = () => {
    const [inputBin, setInputBin] = useState("");
    const [iteration, setIteration] = useState("");
    const [crcResult, setCrcResult] = useState({
        hex: "",
        totalTime: "",
        iterationTime: ""
    })

    const handleBinChange = (e) => {
        setInputBin(e.target.value);
    };

    const calculateCRC = (data) => {
        let crc = 0;
        for (let current of data) {
            crc ^= (current << 7);
            for (let i = 0; i < 8; i++) {
                crc <<= 1;
                if ((crc & 0x8000) !== 0) {
                    crc ^= 0x4599;
                }
                crc &= 0xFFFF;
            }
        }
        return crc & 0x7FFF;
    }

const bitStringToByteArray = (input) => {
        const byteList = [];
        for (let i = input.length - 1; i >= 0; i -= 8) {
            let byteString = "";
            for (let j = 0; (i - j) >= 0 && j < 8; j++) {
                byteString = input.charAt(i - j) + byteString;
            }
            if (byteString) {
                byteList.push(parseInt(byteString, 2));
            }
        }
        byteList.reverse();
        return byteList;
    }

    const handleButtonClick = () => {
        const start = performance.now();
        const byteArray = bitStringToByteArray(inputBin.replace(/\s+/g, ''));
        let totalCrc = 0;
        for (let i = 0; i < parseInt(iteration); i++) {
            totalCrc = calculateCRC(byteArray);
        }
        const end = performance.now();

        setCrcResult({
            hex: totalCrc.toString(16).padStart(2, '0').toUpperCase(),
            totalTime: `${(end - start).toFixed(6)} ms`,
            iterationTime: `${((end - start) / parseInt(iteration)).toFixed(6)} ms`
        });
    };


    return (
        <div className="flex flex-col justify-center min-h-screen">
            <InputField
                label="Sequence of bytes in binary notation"
                id="bytes_in_hex"
                value={inputBin}
                onChange={handleBinChange}
                placeholder="10"
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
    );
};

export default CanCrc;