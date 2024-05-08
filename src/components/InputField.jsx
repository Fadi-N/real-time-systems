import React from 'react';

const InputField = ({ label, id, value, onChange, placeholder }) => {
    return (
        <div className="mt-4">
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 text-left">
                {label}
            </label>
            <input
                id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default InputField;