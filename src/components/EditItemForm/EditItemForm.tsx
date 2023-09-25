import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import './edit-item-form.css';
import { Modal } from '../Modal/Modal';

interface Form {
    x: number;
    y: number;
    z: number;
    points: number;
}

type OnChangeHandler = (prop: keyof Form) => (val: number) => void;

type Props<T extends Form> = {
    item: T | undefined;
    onSubmit: (item: T) => void;
    onChange: OnChangeHandler;
    error: string | false;
    disabledSubmit: boolean;
    validate: (item: T) => boolean;
};

export const EditItemForm = <T extends Form>({
    item,
    onSubmit,
    onChange,
    error,
    disabledSubmit,
    validate,
}: Props<T>) => {
    const [open, setOpen] = useState(false);

    const onConfirm = () => {
        setOpen(false);
        onSubmit(item as T);
    };

    const onCancel = () => {
        setOpen(false);
    };

    const handleOpenModal = () => {
        if (!validate(item as T)) {
            return;
        }
        setOpen(true);
    };

    const handleChange =
        (prop: 'x' | 'y' | 'z' | 'points') =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10);
            onChange(prop)(val);
        };

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && item) {
            handleOpenModal();
        }
    };
    return (
        <div className="edit-section-container" onKeyDown={handleEnter}>
            {item ? (
                <div className="edit-item-container">
                    <div className="input-field-wrapper">
                        <div>x: {item.x}</div>
                        <input
                            className="input"
                            type="number"
                            value={item.x}
                            onChange={handleChange('x')}
                        />
                    </div>
                    <div className="input-field-wrapper">
                        <div>y: {item.y}</div>
                        <input
                            className="input"
                            type="number"
                            value={item.y}
                            onChange={handleChange('y')}
                        />
                    </div>
                    <div className="input-field-wrapper">
                        <div>z: {item.z}</div>
                        <input
                            className="input"
                            type="number"
                            value={item.z}
                            onChange={handleChange('z')}
                        />
                    </div>
                    <div className="input-field-wrapper">
                        <div>Points: {item.points}</div>
                        <input
                            className="input"
                            type="number"
                            value={item.points}
                            onChange={handleChange('points')}
                        />
                    </div>
                    <div className="edit-item-submit">
                        <button
                            disabled={disabledSubmit}
                            onClick={handleOpenModal}
                            type="button"
                            className="edit-item-btn"
                        >
                            Submit
                        </button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </div>
            ) : (
                <></>
            )}
            {open &&
                createPortal(
                    <Modal onCancel={onCancel} onConfirm={onConfirm} />,
                    document.getElementById('portal-root') || document.body
                )}
        </div>
    );
};
