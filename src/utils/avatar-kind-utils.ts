import { AvatarItemKind } from '../types/Avataritem';

export const getLabel = (kind: AvatarItemKind): string => {
    switch (kind) {
        case AvatarItemKind.Accessory:
            return 'Accessory';
        case AvatarItemKind.Badge:
            return 'Badge';
        case AvatarItemKind.Belt:
            return 'Belt';
        case AvatarItemKind.Body:
            return 'Body';
        case AvatarItemKind.Boots:
            return 'Boots';
        case AvatarItemKind.Eyes:
            return 'Eyes';
        case AvatarItemKind.Gloves:
            return 'Gloves';
        case AvatarItemKind.Hat:
            return 'Hat';
        case AvatarItemKind.Legs:
            return 'Legs';
        case AvatarItemKind.Mantle:
            return 'Mantle';
        case AvatarItemKind.Mask:
            return 'Mask';
        case AvatarItemKind.Torso:
            return 'Torso';
        default:
            return "Doesn't exist";
    }
};

export type Option = { value: number; label: string };

export const options: Option[] = Object.values(AvatarItemKind)
    .filter(Number.isInteger)
    .map((n) => ({
        value: n as AvatarItemKind,
        label: getLabel(n as AvatarItemKind),
    }));
