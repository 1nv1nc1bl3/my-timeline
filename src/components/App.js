import { useState } from 'react';
import Form from './Form.js'; // (Line 2) Εισάγουμε το Form component από το άλλο αρχείο Form.js

export default function App() {
    const [formItems, setFormItems] = useState([]); // (Line 5) Ο state πίνακας που κρατάει όλα τα items

    const storeItem = (date, text) => {
        // (Line 7) Συνάρτηση για να προσθέσουμε item, περνάει σαν prop στο Form (βλ. Line 27)
        const newItem = { date, text };
        setFormItems([...formItems, newItem]);
    };

    function formatDate(isoDate) {
        // (Line 12) Μορφοποιεί την ημερομηνία από yyyy-mm-dd σε dd/mm/yyyy
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    function handleDelete(indexToDelete) {
        // (Line 16) Λαμβάνει το index του item που θέλουμε να σβήσουμε
        setFormItems(formItems.filter((_, index) => index !== indexToDelete));
        // (Line 17) Δημιουργεί νέο array χωρίς το item στο συγκεκριμένο index
    }

    return (
        <div className='mainApp'>
            <h1>Facts Timeline</h1>

            {/* (Line 27) Το Form παίρνει το storeItem ως prop. Βρίσκεται στο αρχείο Form.js */}
            <Form storeItem={storeItem} />

            <ul className='timeline'>
                {[...formItems]
                    .sort((a, b) => new Date(a.date) - new Date(b.date)) // (Line 32) Ταξινομούμε με βάση την ημερομηνία
                    .map((item, index) => (
                        <li key={index}>
                            <span className='listItem itemDate'>
                                {formatDate(item.date)}
                            </span>
                            <span className='listItem itemText'>
                                {item.text}
                            </span>
                            <button
                                className='listItem itemDelete'
                                onClick={() => handleDelete(index)}
                                // (Line 43) Το delete button καλεί το handleDelete και στέλνει το index
                            >
                                ❌
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
