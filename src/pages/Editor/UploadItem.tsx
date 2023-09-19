import { ChangeEvent, FormEvent, DragEvent, useContext, useState } from 'react';
import Select from 'react-select';
import { options, getLabel, Option } from '../../utils/avatar-kind-utils';
import { AvatarItemContext } from '../../context/AvatarItemContext';

export const UploadItem = () => {
    const {
        handleUpdateNewItem,
        newItem,
        createNewAvatarItem,
        discardNewItem,
    } = useContext(AvatarItemContext);
    const [loading, setLoading] = useState(false);

    const handleSelect = (option: Option | null) => {
        if (!option) return;
        handleUpdateNewItem('kind')(option.value);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpdateNewItem('file')(file);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpdateNewItem('file')(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if (!newItem || !newItem.file) return;
        setLoading(true);
        fileReader.onload = (e) => {
            if (e.target?.result) {
                if (newItem) {
                    handleUpdateNewItem('image')(e.target.result.toString());
                }
            }
            setLoading(false);
        };
        fileReader.readAsDataURL(newItem.file);
    };

    const handleDiscard = (e: FormEvent) => {
        console.log('here');
        e.preventDefault();
        discardNewItem();
    };

    return (
        <div className="new-item-form-wrapper">
            {!newItem ? (
                <div>
                    <button type="button" onClick={createNewAvatarItem}>
                        Create new item
                    </button>
                </div>
            ) : (
                <>
                    <h3>Upload new item image</h3>
                    <form className="new-item-form" onSubmit={handleSubmit}>
                        <div className="input-field-wrapper">
                            <label
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                className={
                                    'file-label' +
                                    (newItem?.file === '' ? '' : ' has-file')
                                }
                                htmlFor="file"
                            >
                                {newItem?.file === ''
                                    ? 'Click to choose file or drag and drop'
                                    : newItem?.file.name}
                                <input
                                    onChange={handleFileUpload}
                                    name="file"
                                    id="file"
                                    className="input"
                                    type="file"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                        <div className="input-field-wrapper">
                            <label htmlFor="kind">Select kind</label>
                            <Select
                                value={
                                    newItem.kind
                                        ? {
                                              value: newItem.kind,
                                              label: getLabel(newItem.kind),
                                          }
                                        : undefined
                                }
                                onChange={handleSelect}
                                options={options}
                                styles={{
                                    control: (baseStyles) => ({
                                        ...baseStyles,
                                        backgroundColor: 'white',
                                        width: '50%',
                                        marginBottom: '10px',
                                    }),
                                }}
                            />
                        </div>
                        <div className="item-submit-wrapper">
                            <button
                                disabled={loading}
                                className="edit-item-btn"
                            >
                                {!newItem.image
                                    ? 'Create image'
                                    : 'Update image'}
                            </button>
                            <button
                                type="button"
                                disabled={loading}
                                className="discard-item-btn"
                                onClick={handleDiscard}
                            >
                                Discard item
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};
