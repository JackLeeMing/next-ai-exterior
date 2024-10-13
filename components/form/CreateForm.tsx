'use client'

import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Select, Button, Radio } from 'antd';
import { StyleOptions } from '@/lib/data'
import type { RadioChangeEvent } from 'antd';

const { Dragger } = Upload;

// import Image from 'next/image';
// import Link from 'next/link'
const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};





export const CreateForm = function () {

    const defaultValue = StyleOptions[0].value

    const [resStyle, setResStyle] = useState(defaultValue)
    const [mode, setMode] = useState('Exterior')
    const handleChange = (value: string) => {
        setResStyle(value)
    };

    const onGenerateClick = () => {

    }
    const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
        setMode(value);
    };

    const _modeText = mode.toLocaleLowerCase()
    return (
        <>
            <div className='modes'>
                <Radio.Group
                    options={[{ label: 'Exterior', value: 'Exterior' }, { label: 'Interior', value: 'Interior' }]}
                    onChange={onChange4}
                    value={mode}
                    optionType="button"
                    buttonStyle="solid"
                />
            </div>
            <h2 className='title'>AI House Remodel</h2>
            <h3 className='next-title'>Revolutionize Your Home&rsquo;s {mode} with AI</h3>
            <div className='step-form'>
                <h3 className='step-title' style={{ marginTop: 16 }}>
                    Step1: Upload the old {_modeText} house photo
                </h3>
                <div style={{ marginTop: 16, height: 200 }}>
                    <Dragger {...props} style={{ width: 600 }}>
                        <p className="ant-upload-drag-icon">
                            <PlusOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag an image here
                        </p>
                        <p className="ant-upload-hint">
                            Support png, jpeg
                        </p>
                    </Dragger>
                </div>
                <h3 className='step-title' style={{ marginTop: 16 }}>
                    Step2: Choose the design style
                </h3>
                <Select
                    size='large'
                    defaultValue={defaultValue}
                    style={{ width: 600, marginTop: 16 }}
                    onChange={handleChange}
                    options={StyleOptions}
                />
                <h3 className='step-title' style={{ marginTop: 16 }}>
                    Step3: Generate the result
                </h3>
                <div className='buttons' style={{ marginTop: 16 }}>
                    <Button size='large' danger type='primary' onClick={onGenerateClick} style={{ width: 160 }}>
                        Generate
                    </Button>
                </div>
                <div style={{ display: 'none' }}>
                    style: {resStyle}
                </div>
            </div>
        </>

    )
}