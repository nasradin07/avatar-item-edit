import './avatar-picker.css';

type Props = {
    id: string;
    image: string;
    onIconClick?: (img: string) => void;
    active?: boolean;
};
export const AvatarPickerIcon = ({ id, image, onIconClick, active }: Props) => {
    return (
        <img
            className="avatar-icon"
            key={id}
            src={image}
            onClick={() => onIconClick?.(image)}
            style={active ? { border: '2px solid rgb(5, 187, 5)' } : {}}
        />
    );
};
