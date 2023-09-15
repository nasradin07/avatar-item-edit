import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';

export const EditSection = () => {
    const { editItemId, handleUpdateItem, selectedItems, saveChanges, error } =
        useContext(AvatarItemContext);

    const item = selectedItems.find((i) => i.id === editItemId);

    return (
        <div className="edit-section-container">
            <h3>Edit Section</h3>
            {item ? (
                <div className="edit-item-container">
                    <div className="edit-item-cell">
                        <div>x: {item.x}</div>
                        <input
                            className="login-input"
                            type="number"
                            value={item.x}
                            onChange={handleUpdateItem('x')}
                        />
                    </div>
                    <div className="edit-item-cell">
                        <div>y: {item.y}</div>
                        <input
                            className="login-input"
                            type="number"
                            value={item.y}
                            onChange={handleUpdateItem('y')}
                        />
                    </div>
                    <div className="edit-item-cell">
                        <div>z: {item.z}</div>
                        <input
                            className="login-input"
                            type="number"
                            value={item.z}
                            onChange={handleUpdateItem('z')}
                        />
                    </div>
                    <div className="edit-item-cell">
                        <div>Points: {item.points}</div>
                        <input
                            className="login-input"
                            type="number"
                            value={item.points}
                            onChange={handleUpdateItem('points')}
                        />
                    </div>
                    <div className="edit-item-submit">
                        <button
                            onClick={() => saveChanges(item)}
                            type="button"
                            className="edit-item-btn"
                        >
                            Submit
                        </button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
