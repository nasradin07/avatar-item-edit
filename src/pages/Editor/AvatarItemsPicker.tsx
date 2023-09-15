import { useContext, useState } from 'react';
import Select from 'react-select';
import { AvatarItemContext } from '../../context/AvatarItemContext';
import { AvatarItemKind } from '../../types/Avataritem';

const getLabel = (kind: AvatarItemKind): string => {
    switch (kind) {
        case AvatarItemKind.Accessory:
            return 'Accessory';
        case AvatarItemKind.Badge:
            return 'Badge';
        case AvatarItemKind.Belt:
            return 'Belt';
        case AvatarItemKind.Body:
            return 'body';
        case AvatarItemKind.Boots:
            return 'boots';
        case AvatarItemKind.Eyes:
            return 'Eyes';
        case AvatarItemKind.Gloves:
            return 'Gloves';
        case AvatarItemKind.Hat:
            return 'Hat';
        case AvatarItemKind.Legs:
            return 'Legs';
        case AvatarItemKind.Mantle:
            return 'Mantle';
        case AvatarItemKind.Mask:
            return 'Mask';
        case AvatarItemKind.Torso:
            return 'Torso';
        default:
            return 'other';
    }
};

type Option = { value: AvatarItemKind; label: string };

const options: Option[] = Object.values(AvatarItemKind)
    .filter(Number.isInteger)
    .map((n) => ({
        value: n as AvatarItemKind,
        label: getLabel(n as AvatarItemKind),
    }));

export const AvatarItemsPicker = () => {
    const { items, handleAdditem, selectedItems, editItemId } =
        useContext(AvatarItemContext);
    const [selectedKind, setSelectedKind] = useState<Option | null>(options[0]);

    const handleSelect = (o: Option | null) => {
        setSelectedKind(o);
    };

    const itemsToShow = items.filter((i) => i.kind === selectedKind?.value);

    const getStyle = (id: string) => {
        if (editItemId === id) {
            return {
                border: '2px solid red',
            };
        }
        if (selectedItems.findIndex((i) => i.id === id) > -1) {
            return {
                border: '2px solid rgb(5, 187, 5)',
            };
        }
        return {};
    };

    return (
        <>
            <Select
                value={selectedKind}
                onChange={handleSelect}
                options={options}
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: 'whitesmoke',
                    }),
                }}
            />
            <div className="avatar-icons-container">
                {itemsToShow.map((item) => (
                    <img
                        key={item.id}
                        className="avatar-item-icon"
                        src={item.image}
                        onClick={() => handleAdditem(item)}
                        style={getStyle(item.id)}
                    />
                ))}
            </div>
        </>
    );
};
