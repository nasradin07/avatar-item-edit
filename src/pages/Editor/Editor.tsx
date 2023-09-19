import {AvatarItemContextProvider} from '../../context/AvatarItemContext';
import {Avatar} from './Avatar';
import {EditSection} from './EditItemSection';
import {PickSvgSection} from './PickSvgSection';

export const Editor = () => {
    return (
        <AvatarItemContextProvider>
            <div className="editor-wrapper">
                <Avatar/>
                <PickSvgSection/>
                <EditSection/>
            </div>
        </AvatarItemContextProvider>
    );
};
