import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';

import { EditItemForm } from './EditItemForm';

export const EditSection = () => {
    const {
        editItemId,
        handleUpdateItem,
        selectedItems,
        saveChanges,
        error,
        requestInProgress,
        newItem,
        handleUpdateNewItem,
        saveNewItem,
    } = useContext(AvatarItemContext);

    const item = selectedItems.find((i) => i.id === editItemId);

    return newItem ? (
        <EditItemForm
            item={newItem}
            error={error}
            onChange={handleUpdateNewItem}
            onSubmit={saveNewItem}
            disabledSubmit={requestInProgress}
        />
    ) : (
        <EditItemForm
            item={item}
            error={error}
            onChange={handleUpdateItem}
            onSubmit={saveChanges}
            disabledSubmit={requestInProgress}
        />
    );
};
