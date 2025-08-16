import { useState } from 'react';

export default function Form(storeNewItem) {
    const [dateEntry, saveDateEntry] = useState('');
    const [textEntry, saveTextEntry] = useState('');
    return (
        <div className='mtForm'>
            <input
                className='mtfield mtInput'
                type='text'
                value={dateEntry}
                onChange={(e) => saveDateEntry(e.target.value)}
            />
            <textarea
                className='mtfield mtArea'
                value={textEntry}
                onChange={(e) => saveTextEntry(e.target.value)}
            />
            <button
                className='mtButton'
                onClick={storeNewItem.storeItem(dateEntry, textEntry)}
            >
                Add Fact
            </button>
        </div>
    );
}
