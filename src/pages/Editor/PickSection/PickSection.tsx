import { useState } from 'react';
import './pick-section.css';
import lisica from '../../../assets/lisica.svg';
import item from '../../../assets/item.svg';
import upload from '../../../assets/upload.svg';
import { SelectedComponent } from './SelectedComponent';

const sections = [
    {
        label: 'Avatar',
        image: lisica,
    },
    {
        label: 'Items',
        image: item,
    },
    {
        label: 'Add new',
        image: upload,
    },
];

export const PickSection = () => {
    const [active, setActive] = useState('Avatar');

    return (
        <div className="edit-section-wrapper">
            <div className="picker">
                {sections.map(({ label, image }) => (
                    <div
                        onClick={() => setActive(label)}
                        className="picker-item"
                    >
                        <img src={image} className="picker-item-image" />
                        <div className="picker-item-label">{label}</div>
                    </div>
                ))}
            </div>
            <div className="picked-wrapper">
                <SelectedComponent label={active} />
            </div>
        </div>
    );
};
