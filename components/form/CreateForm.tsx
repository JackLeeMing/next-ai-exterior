'use client'

import { useState, useCallback } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload, Select, Button } from 'antd';
import { StyleOptions } from '@/lib/data'
import type { GetProp, UploadProps } from 'antd';
import type { Prediction } from 'replicate'
import BeforeAfterSlider from '@/components/before-after'
import Image from 'next/image'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt50M = file.size / 1024 / 1024 < 50;
    if (!isLt50M) {
        message.error('Image must smaller than 50MB!');
    }
    return isJpgOrPng && isLt50M;
};
// import Image from 'next/image';
// import Link from 'next/link'
const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: '#',
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const ModleMap: Record<string, string> = {
    'exterior-house-remodel': "Exterior",
    'interior-house-remodel': 'Interior'
}

export const CreateForm = function ({ model }: { model: string }) {

    const defaultValue = StyleOptions[0].value
    const mode = ModleMap[model] ? model : 'exterior-house-remodel'
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [resStyle, setResStyle] = useState(defaultValue)
    const [replicateApiToken, setReplicateApiToken] = useState('')

    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [error, setError] = useState(null);

    const handleSubmit = useCallback(async (prompt: string, image: string) => {
        console.log('prompt', prompt)
        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                image: image
            }),
        });
        let prediction = await response.json();
        console.log('prediction', prediction)
        if (response.status !== 201) {
            setError(prediction.detail);
            return;
        }
        setPrediction(prediction);
        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
        ) {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            console.log({ prediction: prediction });
            setPrediction(prediction);
        }
    }, []);

    const handleUploadChange: UploadProps['onChange'] = (info) => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                console.log(url)
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const handleChange = (value: string) => {
        setResStyle(value)
    };


    const onGenerateClick = () => {
        if (!prediction || !["starting", "starting"].includes(prediction.status)) {
            if (imageUrl && resStyle) {
                setError(null)
                setPrediction(null)
                handleSubmit(`${resStyle} style`, imageUrl)
            }
        }
    }
    const modelStr = ModleMap[mode]
    const _modeText = modelStr.toLocaleLowerCase()
    const uploadButton = (
        <>
            <p className="ant-upload-drag-icon">
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
            </p>
            <p className="ant-upload-text">
                Click or drag an image here
            </p>
            <p className="ant-upload-hint">
                Support png, jpeg
            </p>
        </>
    )

    console.log(prediction)
    // "starting" | "processing" | "succeeded" | "failed" | "canceled";
    const isGenerating = prediction?.status === "starting" || prediction?.status === "processing"
    return (
        <>
            <h2 className='title'>AI House Remodel</h2>
            <h3 className='next-title'>Revolutionize Your Home&rsquo;s {modelStr} with AI</h3>
            <div className='step-form'>
                <h3 className='step-title' style={{ marginTop: 16 }}>
                    Step1: Upload the old {_modeText} house photo
                </h3>
                <div style={{ marginTop: 16, height: 300 }}>
                    <Dragger
                        {...props}
                        style={{ width: 600 }}
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}>
                        {imageUrl ? <Image src={imageUrl} alt="avatar" height={268} width={568} style={{ width: '100%', height: 268 }} /> : uploadButton}
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
                    <Button size='large' danger type='primary' onClick={onGenerateClick} style={{ width: 200 }}>
                        {isGenerating ? 'AI is generating' : 'Generate'}
                    </Button>
                </div>
                <div style={{ display: 'none' }}>
                    style: {resStyle}
                </div>
                {error && <div>{error}</div>}
                {prediction && (
                    <>
                        {prediction.output && (
                            <div className="image-wrapper mt-5">
                                <div className="max-w-3xl">
                                    <BeforeAfterSlider
                                        firstImage={{ imageUrl: imageUrl as string, alt: 'remodel before image' }}
                                        secondImage={{ imageUrl: prediction.output[prediction.output.length - 1], alt: 'remodel after image' }}
                                    />
                                </div>
                            </div>
                        )}
                        <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
                    </>
                )}
            </div>
        </>

    )
}