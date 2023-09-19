import { AvatarItem } from '../types/Avataritem';
import { CreateAvatarItemForm } from '../types/CreateAvatarItemForm';
import { getLabel } from './avatar-kind-utils';

const keysToValidate = ['x', 'y', 'z'] as const;

export const validateUpdateItem = (item: AvatarItem): null | string => {
    let msg = '';
    keysToValidate.forEach((key) => {
        if (!Number.isInteger(item[key])) {
            msg += `${key} must be an iteger. `;
        }
    });
    return msg || null;
};

export const validateCreateItem = (
    item: CreateAvatarItemForm
): null | string => {
    let msg = '';
    keysToValidate.forEach((key) => {
        if (!Number.isInteger(item[key])) {
            msg += `${key} must be valid integer. `;
        }
    });

    if (item.file === '') {
        msg += 'Missing image.';
    }
    if (!Number.isInteger(item.points)) {
        msg += `Points must be valid integer. `;
    }
    if (getLabel(item.kind) === "Doesn't exist") {
        msg += 'Please select item kind.';
    }
    return msg || null;
};
