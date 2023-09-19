import { createContext, useEffect, useState } from 'react';
import { AvatarItem, AvatarItemKind } from '../types/Avataritem';
import { Avatar } from '../types/Avatar';
import { makeRequest } from '../client';
import { useRequestTrack } from '../hooks/useRequestTrack';
import { UpdateResult } from '../types/UpdateResult';
import { handleFetch } from '../utils/handleFetch';
import { CreateAvatarItemForm } from '../types/CreateAvatarItemForm';
import { validateCreateItem, validateUpdateItem } from '../utils/validations';

export type UpdateItemHandler = (
    prop: 'x' | 'y' | 'z' | 'points'
) => (val: number) => void;

type AvatarItemContext = {
    avatars: Avatar[];
    items: AvatarItem[];
    setAvatarImage: React.Dispatch<React.SetStateAction<string | null>>;
    avatarImage: string | null;
    handleAdditem: (item: AvatarItem) => void;
    selectedItems: AvatarItem[];
    editItemId: string | null;
    handleUpdateItem: UpdateItemHandler;
    requestInProgress: boolean;
    error: string | false;
    saveChanges: (item: AvatarItem) => Promise<void>;
    newItem: CreateAvatarItemForm | null;
    handleUpdateNewItem: (
        prop: keyof CreateAvatarItemForm
    ) => (value: File | string | number) => void;
    createNewAvatarItem: () => void;
    discardNewItem: () => void;
    saveNewItem: (item: CreateAvatarItemForm) => Promise<void>;
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
    newItem: null,
    handleUpdateNewItem: () => () => {},
    createNewAvatarItem: () => {},
    saveNewItem: () => new Promise(() => {}),
    discardNewItem: () => {},
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

    const [newItem, setNewItem] = useState<CreateAvatarItemForm | null>(null);

    const handleAdditem = (item: AvatarItem) => {
        setSelectedItem((pre) => {
            if (pre.findIndex((i) => i.id === item.id) > -1) {
                return pre.filter((i) => i.id !== item.id);
            }
            return [...pre.filter((i) => i.kind !== item.kind), item];
        });
        setEditItemId((pre) => (pre === item.id ? null : item.id));
    };

    const handleUpdateItem: UpdateItemHandler = (prop) => (value) => {
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

    const saveChanges = async (item: AvatarItem) => {
        setError(false);
        if (requestInProgress) return;
        const validationRes = validateUpdateItem(item);
        if (validationRes !== null) {
            setError(validationRes);
            return;
        }
        setRequestInProgress(true);
        const res = await makeRequest<UpdateResult>(
            'PUT',
            `/avatar_item/${item.id}`,
            JSON.stringify({ x: item.x, y: item.y, z: item.z })
        );
        setRequestInProgress(false);
        if (res === 'Error') {
            setError('Failed to update item');
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

    const handleUpdateNewItem =
        (prop: keyof CreateAvatarItemForm) => (val: string | File | number) => {
            setNewItem((pre) => {
                if (!pre) return pre;
                return { ...pre, [prop]: val };
            });
        };

    const createNewAvatarItem = () => {
        const obj: CreateAvatarItemForm = {
            x: 0,
            y: 0,
            z: 0,
            points: 20,
            kind: AvatarItemKind.Body,
            file: '',
            image: '',
        };
        setNewItem(obj);
    };

    const discardNewItem = () => {
        setNewItem(null);
    };

    const saveNewItem = async (item: CreateAvatarItemForm) => {
        setError(false);
        if (requestInProgress) return;
        const validationRes = validateCreateItem(item);
        if (validationRes !== null) {
            setError(validationRes);
            return;
        }
        setRequestInProgress(true);
        const form = new FormData();
        Object.keys(item).forEach((key) => {
            if (key !== 'image') {
                form.set(
                    key,
                    item[key as keyof CreateAvatarItemForm] as string
                );
            }
        });
        const res = await makeRequest<AvatarItem>('POST', `/avatar_item`, form);
        setRequestInProgress(false);
        if (res === 'Error') {
            setError('Failed to update item');
        } else {
            res.image = item.image;
            setItems((pre) => [...pre, res]);
            setSelectedItem((pre) => [...pre, res]);
            discardNewItem();
        }
    };

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
                newItem,
                handleUpdateNewItem,
                createNewAvatarItem,
                saveNewItem,
                discardNewItem,
            }}
        >
            {children}
        </AvatarItemContext.Provider>
    );
};
