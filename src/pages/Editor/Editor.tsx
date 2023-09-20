import { AvatarItemContextProvider } from '../../context/AvatarItemContext';
import { Main } from './Main/Main';
import { PickSection } from './PickSection/PickSection';

export const Editor = () => {
    return (
        <AvatarItemContextProvider>
            <div className="editor-wrapper">
                <PickSection />
                <Main />
            </div>
        </AvatarItemContextProvider>
    );
};
