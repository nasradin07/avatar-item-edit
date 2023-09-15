import { AvatarItemsPicker } from './AvatarItemsPicker';
import { AvatarPicker } from './AvatarPicker';

export const PickSvgSection = () => {
    return (
        <div className="pick-svg-container">
            <div className="pick-svg-item">
                <AvatarPicker />
            </div>
            <div className="pick-svg-item">
                <AvatarItemsPicker />
            </div>
        </div>
    );
};
