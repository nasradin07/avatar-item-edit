import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';

export const AvatarPicker = () => {
    const { avatars, setAvatarImage, avatarImage } =
        useContext(AvatarItemContext);

    return (
        <>
            <h3>Pick avatar</h3>
            <div className="avatars-container">
                {avatars.map(({ id, image }) => (
                    <img
                        className="avatar-icon"
                        key={id}
                        src={image}
                        onClick={() => setAvatarImage(image)}
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
