import { ChangeEvent } from 'react';

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
};

export const EditItemForm = <T extends Form>({
    item,
    onSubmit,
    onChange,
    error,
    disabledSubmit,
}: Props<T>) => {
    const handleChange =
        (prop: 'x' | 'y' | 'z' | 'points') =>
        (e: ChangeEvent<HTMLInputElement>) => {
            const val = parseInt(e.target.value, 10);
            onChange(prop)(val);
        };
    return (
        <div className="edit-section-container">
            <h3>Edit Section</h3>
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
                            onClick={() => onSubmit(item)}
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
        </div>
    );
};
