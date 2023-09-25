import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';
import './avatar-picker.css';
import { AvatarPickerIcon } from './AvatarPickerIcon';

export const AvatarPicker = () => {
    const { avatars, setAvatarImage, avatarImage } =
        useContext(AvatarItemContext);

    const handlePickIcon = (img: string) => {
        setAvatarImage((pre) => (pre === img ? null : img));
    };

    return (
        <div className="avatars-container">
            {avatars.map(({ id, image }) => (
                <AvatarPickerIcon
                    id={id}
                    image={image}
                    onIconClick={handlePickIcon}
                    active={image === avatarImage}
                />
            ))}
        </div>
    );
};
