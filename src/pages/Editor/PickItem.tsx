import { useContext, useState } from 'react';
import Select from 'react-select';
import { AvatarItemContext } from '../../context/AvatarItemContext';
import { Option, options } from '../../utils/avatar-kind-utils';
import { AvatarItem } from '../../types/Avataritem';

export const PickItem = () => {
    const {
        items,
        handleAdditem,
        selectedItems,
        editItemId,
        newItem,
        discardNewItem,
    } = useContext(AvatarItemContext);
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
        if (newItem && window.confirm('Do you want to discard new item?')) {
            discardNewItem();
            handleAdditem(item);
            return;
        }
        handleAdditem(item);
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
                        onClick={() => addItemToSelected(item)}
                        style={getStyle(item.id)}
                    />
                ))}
            </div>
        </>
    );
};
