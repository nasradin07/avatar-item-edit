import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';
import './avatar-picker.css';

export const AvatarPicker = () => {
    const { avatars, setAvatarImage, avatarImage } =
        useContext(AvatarItemContext);

    return (
        <>
            <div className="avatars-container">
                {avatars.map(({ id, image }) => (
                    <img
                        className="avatar-icon"
                        key={id}
                        src={image}
                        onClick={() =>
                            setAvatarImage((pre) =>
                                pre === image ? null : image
                            )
                        }
                        style={
                            avatarImage === image
                                ? { border: '2px solid rgb(5, 187, 5)' }
                                : {}
                        }
                    />
                ))}
            </div>
        </>
    );
};