import { useState } from 'react';

import Form from './components/Form.js';

export default function App() {
    const [formItems, setFormItems] = useState([]);

    const storeItem = function (date, text) {
        const newItem = { date, text };
        setFormItems([...formItems, newItem]);
    };

    return (
        <div className='App'>
            <h1>My Timeline</h1>
            <Form storeNewItem={storeItem} />
        </div>
    );
}
