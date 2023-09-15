import { createContext, useEffect, useState, ChangeEvent } from 'react';
import { AvatarItem } from '../types/Avataritem';
import { Avatar } from '../types/Avatar';
import { makeRequest } from '../client';
import { useRequestTrack } from '../hooks/useRequestTrack';
import { UpdateResult } from '../types/UpdateResult';
import { handleFetch } from '../utils/handleFetch';

type UpdateItemHandler = (
    prop: 'x' | 'y' | 'z' | 'points'
) => (e: ChangeEvent<HTMLInputElement>) => void;

type AvatarItemContext = {
    avatars: Avatar[];
    items: AvatarItem[];
    setAvatarImage: (val: string | null) => void;
    avatarImage: string | null;
    handleAdditem: (item: AvatarItem) => void;
    selectedItems: AvatarItem[];
    editItemId: string | null;
    handleUpdateItem: UpdateItemHandler;
    requestInProgress: boolean;
    error: string | false;
    saveChanges: (item: AvatarItem) => Promise<void>;
};

export const AvatarItemContext = createContext<AvatarItemContext>({
    avatars: [],
    items: [],
    setAvatarImage: () => {},
    avatarImage: null,
    handleAdditem: () => {},
    selectedItems: [],
    editItemId: null,
    handleUpdateItem: () => () => {},
    requestInProgress: false,
    error: false,
    saveChanges: () => new Promise(() => {}),
});

export const AvatarItemContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [items, setItems] = useState<AvatarItem[]>([]);
    const [avatars, setAvatars] = useState<Avatar[]>([]);
    const [selectedItems, setSelectedItem] = useState<AvatarItem[]>([]);
    const [avatarImage, setAvatarImage] = useState<string | null>(null);
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const { requestInProgress, error, setError, setRequestInProgress } =
        useRequestTrack();

    const handleAdditem = (item: AvatarItem) => {
        setSelectedItem((pre) => {
            if (pre.findIndex((i) => i.id === item.id) > -1) {
                return pre.filter((i) => i.id !== item.id);
            }
            return [...pre.filter((i) => i.kind !== item.kind), item];
        });
        setEditItemId((pre) => (pre === item.id ? null : item.id));
    };

    const handleUpdateItem: UpdateItemHandler = (prop) => (e) => {
        const value = parseInt(e.target.value, 10);
        setSelectedItem((pre) => {
            const index = pre.findIndex((i) => i.id === editItemId);
            if (index < 0) return pre;
            return [
                ...pre.slice(0, index),
                { ...pre[index], [prop]: value },
                ...pre.slice(index + 1, pre.length),
            ];
        });
    };

    const saveChanges = async ({ id, x, y, z }: AvatarItem) => {
        setError(false);
        if (requestInProgress) return;
        setRequestInProgress(true);
        const res = await makeRequest<UpdateResult>(
            'PUT',
            `/avatar_item/${id}`,
            JSON.stringify({ x, y, z })
        );
        setRequestInProgress(false);
        if (res === 'Error') {
            setError('Failed to update item');
        } else {
            console.log(
                items.find((i) => i.id === id),
                { x, y, z }
            );
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        handleFetch<Avatar[]>(signal, '/avatar/all')
            .then((res) => {
                if (res !== 'Error') {
                    setAvatars(res);
                }
            })
            .catch(() => console.log('Error fetching avatars'));

        handleFetch<AvatarItem[]>(signal, '/avatar_item/all')
            .then((res) => {
                if (res !== 'Error') {
                    setItems(res);
                }
            })
            .catch(() => console.log('Error fetching avatar items'));

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <AvatarItemContext.Provider
            value={{
                avatars,
                items,
                setAvatarImage,
                avatarImage,
                handleAdditem,
                selectedItems,
                editItemId,
                handleUpdateItem,
                requestInProgress,
                error,
                saveChanges,
            }}
        >
            {children}
        </AvatarItemContext.Provider>
    );
};
