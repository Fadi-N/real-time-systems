import React from 'react';

const InfoCard = ({label, value}) => {
    return (
        <div className="flex-1 mt-12 p-6 bg-white border border-gray-200 rounded-2xl shadow">
            <label className="text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="text-lg font-bold ms-2">{value ? value : "-"}</div>
        </div>
    );
};

export default InfoCard;