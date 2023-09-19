import { AvatarItem } from './Avataritem';

export type CreateAvatarItemForm = Omit<AvatarItem, 'id'> & { file: File | '' };
