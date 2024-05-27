import React from 'react';

const RadioOption = ({id, customClass, label, value, checked, onChange}) => {
    return (
        <div className={`flex flex-row ${customClass}`}>
            <input
                id={id}
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                type="radio"
                name="conversionType"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
                {label}
            </label>
        </div>
    );
};

export default RadioOption;