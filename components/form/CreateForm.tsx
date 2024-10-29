'use client'

import { useState, useCallback } from 'react'
import { PlusOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Upload, Select, Button, Spin } from 'antd';
import { StyleOptions } from '@/lib/data'
import type { GetProp, UploadProps } from 'antd';
import type { Prediction } from 'replicate'
import BeforeAfterSlider from '@/components/before-after'
import Image from 'next/image'
import { Download } from './Download'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const { Dragger } = Upload;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    console.log(file.type)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
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

    const [prediction, setPrediction] = useState<Prediction | null>(null);
    const [requsting, setRequesting] = useState(false)
    const [error, setError] = useState(null);

    const handleSubmit = useCallback(async (prompt: string, image: string) => {
        console.log('prompt', prompt)
        setRequesting(true)
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
        console.log('response', response)
        let res = await response.json();
        if (res.code !== 200) {
            setError(res.error || 'request error!');
            setRequesting(false)
            return;
        }
        let prediction = res.data
        if (!prediction) {
            setError(res.error || 'prediction is empty');
            setRequesting(false)
            return;
        }
        setPrediction(prediction);
        while (prediction.status !== "succeeded" && prediction.status !== "failed") {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            const res = await response.json();
            if (res.code !== 200) {
                setError(res.error || 'fail to get prediction ' + prediction.id);
                setRequesting(false)
                return;
            }
            prediction = res.data
            console.log({ prediction: prediction });
            setPrediction(prediction);
        }
        setRequesting(false)
    }, []);

    const handleUploadChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const handleChange = (value: string) => {
        setResStyle(value)
    };


    const onGenerateClick = () => {
        if (loading) return
        if (!prediction || !["starting", "starting"].includes(prediction.status)) {
            if (imageUrl && resStyle) {
                setError(null)
                setPrediction(null)
                handleSubmit(`${mode}, ${resStyle} style`, imageUrl)
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
                Support png, jpeg, webp
            </p>
        </>
    )

    const onClearClick = () => {
        setError(null)
        setPrediction(null)
        setImageUrl('')
    }

    console.log(prediction)
    // "starting" | "processing" | "succeeded" | "failed" | "canceled";
    const isGenerating = prediction?.status === "starting" || prediction?.status === "processing"
    return (
        <>
            <Spin
                fullscreen
                spinning={requsting || isGenerating}
                tip="AI is generating ..."
                indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />}>
            </Spin>
            <div className='download' style={{ display: 'none' }}>
                <a id='result-download'></a>
            </div>
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
                    <Button size='large' danger type='primary' onClick={onGenerateClick} style={{ width: 222 }}>
                        Generate
                    </Button>
                    {
                        prediction && prediction.output &&
                        <Download imageUrl={prediction.output[prediction.output.length - 1]} />
                    }
                </div>
                <div style={{ display: 'none' }}>
                    style: {resStyle}
                </div>
                {error && <div className='error-detail'>{error}</div>}
            </div>
            {prediction && (
                <>
                    {prediction.output && (
                        <div className="image-wrapper">
                            <Button icon={<DeleteOutlined />} type='text' danger title='clear the result ?' onClick={onClearClick}>
                            </Button>
                            <BeforeAfterSlider
                                firstImage={{ imageUrl: imageUrl as string, alt: 'remodel before image' }}
                                secondImage={{ imageUrl: prediction.output[prediction.output.length - 1], alt: 'remodel after image' }}
                            />
                            <div style={{ width: '100%', height: 50 }}></div>
                        </div>
                    )}
                </>
            )}
        </>

    )
}