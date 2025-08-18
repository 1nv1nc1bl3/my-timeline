import { useState } from 'react';

export default function Form({ storeItem }) {
    // (Line 3) To storeItem έρχεται από το App.js (Line 27)

    const [dateEntry, saveDateEntry] = useState('');
    const [textEntry, saveTextEntry] = useState('');

    const handleSubmit = () => {
        if (!dateEntry || !textEntry) return;
        storeItem(dateEntry, textEntry);
        // (Line 10) Καλεί το storeItem από το App.js για να περάσει τα δεδομένα
        saveDateEntry('');
        saveTextEntry('');
    };

    return (
        <div className='mtForm'>
            <input
                id='mtTime'
                className='mtfield mtInput'
                type='date'
                value={dateEntry}
                onChange={(e) => saveDateEntry(e.target.value)}
            />
            <textarea
                id='mtFact'
                className='mtfield mtArea'
                value={textEntry}
                onChange={(e) => saveTextEntry(e.target.value)}
            />
            <button className='mtfield mtButton' onClick={handleSubmit}>
                Add Fact
            </button>
        </div>
    );
}
