import { AvatarItemPicker } from '../../../components/AvatarItemPicker/AvatarItemsPicker';
import { AvatarPicker } from '../../../components/AvatarPicker/AvatarPicker';
import { UploadItem } from '../../../components/UploadItem/UploadItem';

type Props = {
    label: string;
};

export const SelectedComponent = ({ label }: Props) => {
    switch (label) {
        case 'Items':
            return <AvatarItemPicker />;
        case 'Avatar':
            return <AvatarPicker />;
        case 'Add new':
            return <UploadItem />;
        default:
            return <AvatarPicker />;
    }
};
