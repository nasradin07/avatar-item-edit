export enum AvatarItemKind {
    Hat,
    Body,
    Boots,
    Accessory,
    Legs,
    Torso,
    Belt,
    Mask,
    Mantle,
    Gloves,
    Badge,
    Eyes,
}

export type AvatarItem = {
    id: string;
    x: number;
    y: number;
    z: number;
    points: number;
    image: string;
    kind: AvatarItemKind;
};
