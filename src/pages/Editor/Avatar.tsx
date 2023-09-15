import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';

export const Avatar = () => {
    const { avatarImage, selectedItems } = useContext(AvatarItemContext);

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
                            zIndex: z,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
