import { ChangeEvent, DragEvent, useEffect, useContext } from 'react';
import './upload-item.css';
import Select from 'react-select';
import { options, getLabel, Option } from '../../utils/avatar-kind-utils';
import { EditItemForm } from '../EditItemForm/EditItemForm';
import { AvatarItemContext } from '../../context/AvatarItemContext';

export const UploadItem = () => {
    const {
        newItem: item,
        handleUpdateNewItem: handleUpdateItem,
        requestInProgress,
        error,
        saveNewItem,
        validateNewItemForm,
    } = useContext(AvatarItemContext);
    const file = item.file;

    const handleSelect = (option: Option | null) => {
        if (!option) return;
        handleUpdateItem('kind')(option.value);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpdateItem('file')(file);
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
            handleUpdateItem('file')(e.dataTransfer.files[0]);
        }
    };

    useEffect(() => {
        const fileReader = new FileReader();
        if (!file) return;
        fileReader.onload = (e) => {
            if (e.target?.result) {
                handleUpdateItem('image')(e.target.result.toString());
            }
        };
        fileReader.readAsDataURL(file);

        return () => {
            fileReader.abort();
        };
    }, [file]);

    return (
        <div className="new-item-form-wrapper">
            <div className="new-item-form">
                <div className="label-wrapper">
                    <label
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={
                            'file-label' + (file === '' ? '' : ' has-file')
                        }
                        htmlFor="file"
                    >
                        {file === ''
                            ? 'Click to choose file or \n drag and drop'
                            : file.name}
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
                            item.kind
                                ? {
                                      value: item.kind,
                                      label: getLabel(item.kind),
                                  }
                                : undefined
                        }
                        onChange={handleSelect}
                        options={options}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                backgroundColor: 'white',
                                width: '100%',
                                marginBottom: '10px',
                            }),
                            menu: (baseStyles) => ({
                                ...baseStyles,
                                color: 'black',
                            }),
                        }}
                    />
                </div>
                <div>
                    <EditItemForm
                        item={item}
                        error={error}
                        onChange={handleUpdateItem}
                        onSubmit={saveNewItem}
                        disabledSubmit={requestInProgress}
                        validate={validateNewItemForm}
                    />
                </div>
            </div>
        </div>
    );
};
