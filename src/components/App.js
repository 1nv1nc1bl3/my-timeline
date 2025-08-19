import { useState } from 'react';
import Form from './Form.js'; // (Line 2) Εισάγουμε το Form component από το άλλο αρχείο Form.js

export default function App() {
    const [formItems, setFormItems] = useState([]); // (Line 5) Ο state πίνακας που κρατάει όλα τα items

    const storeItem = (date, text) => {
        // Συνάρτηση για να προσθέσουμε item, περνάει σαν prop στο Form (βλ. Line 27)
        const newItem = { date, text };
        setFormItems([...formItems, newItem]);
    };

    function formatDate(isoDate) {
        // Μορφοποιεί την ημερομηνία από yyyy-mm-dd σε dd/mm/yyyy
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    function handleDelete(indexToDelete) {
        // Λαμβάνει το index του item που θέλουμε να σβήσουμε
        setFormItems(formItems.filter((_, index) => index !== indexToDelete));
        // Δημιουργεί νέο array χωρίς το item στο συγκεκριμένο index
    }

    const exportToText = () => {
        const textData = formItems
            .map((item) => `${item.date} - ${item.text}`)
            .join('\n');
        const dataStr =
            'data:text/plain;charset=utf-8,' + encodeURIComponent(textData);
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', 'facts-timeline.txt');
        downloadAnchor.click();
    };

    const printTimeline = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(
            '<h1 style="font-size: 50px;line-height: 55px;color: #333;text-align: center;text-transform: uppercase;">Facts Timeline</h1><ul style="list-style:none;">'
        );
        formItems.forEach((item) => {
            printWindow.document.write(`<li>${item.date} - ${item.text}</li>`);
        });
        printWindow.document.write('</ul>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className='mainApp'>
            <h1 className='mainHeader'>Facts Timeline</h1>

            {/* Το Form παίρνει το storeItem ως prop. Βρίσκεται στο αρχείο Form.js */}
            <Form storeItem={storeItem} />

            <ul className='timeline'>
                {[...formItems]
                    .sort((a, b) => new Date(a.date) - new Date(b.date)) // Ταξινομούμε με βάση την ημερομηνία
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
                                // Το delete button καλεί το handleDelete και στέλνει το index
                            >
                                ❌
                            </button>
                        </li>
                    ))}
            </ul>
            {formItems.length > 0 && (
                <div className='listButtons'>
                    <button
                        className='listButton listExport'
                        onClick={exportToText}
                    >
                        Export Timeline
                    </button>

                    <button
                        className='listButton listPrint'
                        onClick={printTimeline}
                    >
                        Print Timeline
                    </button>
                </div>
            )}
        </div>
    );
}
