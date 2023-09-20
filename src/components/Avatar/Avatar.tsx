import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';
import './avatar.css';

export const Avatar = () => {
    const { avatarImage, selectedItems, newItem } =
        useContext(AvatarItemContext);

    return (
        <div className="avatar-icon-wrapper">
            <div className="avatar-with-icons">
                {!!avatarImage && (
                    <img className="main-icon" src={avatarImage} />
                )}
                {selectedItems.map(({ id, image, x, y, z }) => (
                    <img
                        className="avatar-item"
                        key={id}
                        src={image}
                        style={{
                            top: `${y}%`,
                            left: `${x}%`,
                            zIndex: z + 1,
                        }}
                    />
                ))}
                {newItem !== null && newItem.image && (
                    <img
                        className="avatar-item"
                        src={newItem.image}
                        style={{
                            top: `${newItem.y}%`,
                            left: `${newItem.x}%`,
                            zIndex: newItem.z + 1,
                        }}
                    />
                )}
            </div>
        </div>
    );
};
