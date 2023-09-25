import './modal.css';
import { useContext } from 'react';
import { AvatarItemContext } from '../../context/AvatarItemContext';

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
};

export const Modal = ({ onCancel, onConfirm }: Props) => {
    const { avatars, newItem } = useContext(AvatarItemContext);
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-icons-container">
                    {avatars.map(({ id, image }) => (
                        <div
                            key={id}
                            className="modal-avatar-with-icon-wrapper"
                        >
                            <img className="modal-icon" src={image} />
                            <img
                                className="modal-icon"
                                src={newItem.image}
                                style={{
                                    top: `${newItem.y}%`,
                                    left: `${newItem.x}%`,
                                    zIndex: newItem.z + 1,
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="action-wrapper">
                    <button className="modal-button cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button
                        className="modal-button confirm"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
