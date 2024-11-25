import React from 'react';

function LoadingModal({ isOpen, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-lg">
                <p className='text-stone-900'>{message}</p>
            </div>
        </div>
    );
}

export default LoadingModal;
