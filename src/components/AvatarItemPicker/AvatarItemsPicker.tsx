import { useContext, useState } from 'react';
import Select from 'react-select';
import { AvatarItemContext } from '../../context/AvatarItemContext';
import { AvatarItem } from '../../types/Avataritem';
import { options } from '../../utils/avatar-kind-utils';
import { Option } from '../../utils/avatar-kind-utils';
import './avatar-item-picker.css';

export const AvatarItemPicker = () => {
    const { items, handleAdditem, selectedItems, editItemId } =
        useContext(AvatarItemContext);
    const [selectedKind, setSelectedKind] = useState<Option>(options[0]);

    const handleSelect = (o: Option | null) => {
        if (!o) return;
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

    const addItemToSelected = (item: AvatarItem) => {
        handleAdditem(item);
    };

    return (
        <>
            <div className="select-wrapper">
                <div>Category:</div>
                <Select
                    value={selectedKind}
                    onChange={handleSelect}
                    options={options}
                    styles={{
                        container: (baseStyles) => ({
                            ...baseStyles,
                            width: '100%',
                        }),
                        menu: (baseStyles) => ({
                            ...baseStyles,
                            color: 'black',
                        }),
                    }}
                />
            </div>
            <div className="avatar-icons-container">
                {itemsToShow.map((item) => (
                    <img
                        key={item.id}
                        className="avatar-item-icon"
                        src={item.image}
                        onClick={() => addItemToSelected(item)}
                        style={getStyle(item.id)}
                    />
                ))}
            </div>
        </>
    );
};
