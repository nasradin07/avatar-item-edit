import { useState } from 'react';
import { PickItem } from './PickItem';
import { UploadItem } from './UploadItem';

const contentMap = {
    '1': <PickItem />,
    '2': <UploadItem />,
};

export const AvatarItemsPicker = () => {
    const [activeTab, setActiveTab] = useState<'1' | '2'>('1');

    return (
        <>
            <div className="tabs">
                <div
                    className={
                        'tab-option' + (activeTab === '1' ? ' active' : '')
                    }
                    onClick={() => setActiveTab('1')}
                >
                    Edit existing item
                </div>
                <div
                    className={
                        'tab-option' + (activeTab === '2' ? ' active' : '')
                    }
                    onClick={() => setActiveTab('2')}
                >
                    Create new item
                </div>
            </div>
            <div className="avatar-item-picker-content-wrapper">
                {contentMap[activeTab]}
            </div>
        </>
    );
};
