'use client'

import { useState, useCallback } from 'react'
import { PlusOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';
import { message, Upload, Select, Button, Spin } from 'antd';
import { StyleOptions } from '@/lib/data'
import type { GetProp, UploadProps } from 'antd';
import type { Prediction } from 'replicate'
// import BeforeAfterSlider from '@/components/before-after'

import Image from 'next/image'
import { Download } from './Download'
import { Juxtapose } from './Juxtapose'
import '@/app/juxtapose.scss'

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

const data: any = {
    "id": "4d9hwh45h5rj60cjw7cs9zf8ag",
    "model": "jagilley/controlnet-hough",
    "version": "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
    "input": {
        "a_prompt": "best quality, extremely detailed",
        "ddim_steps": 20,
        "detect_resolution": 512,
        "distance_threshold": 0.1,
        "eta": 0,
        "image": "data:image/webp;base64,...",
        "image_resolution": "512",
        "n_prompt": "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        "num_samples": "1",
        "prompt": "exterior-house-remodel, Townhouse style",
        "scale": 9,
        "value_threshold": 0.1
    },
    "logs": "Global seed set to 34655\nGlobal seed set to 34655\nData shape for DDIM sampling is (1, 4, 64, 80), eta 0.0\nRunning DDIM Sampling with 20 timesteps\nDDIM Sampler:   0%|          | 0/20 [00:00<?, ?it/s]\nDDIM Sampler:   5%|▌         | 1/20 [00:00<00:03,  5.16it/s]\nDDIM Sampler:  10%|█         | 2/20 [00:00<00:03,  5.18it/s]\nDDIM Sampler:  15%|█▌        | 3/20 [00:00<00:03,  5.19it/s]\nDDIM Sampler:  20%|██        | 4/20 [00:00<00:03,  5.19it/s]\nDDIM Sampler:  25%|██▌       | 5/20 [00:00<00:02,  5.20it/s]\nDDIM Sampler:  30%|███       | 6/20 [00:01<00:02,  5.19it/s]\nDDIM Sampler:  35%|███▌      | 7/20 [00:01<00:02,  5.19it/s]\nDDIM Sampler:  40%|████      | 8/20 [00:01<00:02,  5.19it/s]\nDDIM Sampler:  45%|████▌     | 9/20 [00:01<00:02,  5.19it/s]\nDDIM Sampler:  50%|█████     | 10/20 [00:01<00:01,  5.19it/s]\nDDIM Sampler:  55%|█████▌    | 11/20 [00:02<00:01,  5.19it/s]\nDDIM Sampler:  60%|██████    | 12/20 [00:02<00:01,  5.19it/s]\nDDIM Sampler:  65%|██████▌   | 13/20 [00:02<00:01,  5.19it/s]\nDDIM Sampler:  70%|███████   | 14/20 [00:02<00:01,  5.19it/s]\nDDIM Sampler:  75%|███████▌  | 15/20 [00:02<00:00,  5.20it/s]\nDDIM Sampler:  80%|████████  | 16/20 [00:03<00:00,  5.20it/s]\nDDIM Sampler:  85%|████████▌ | 17/20 [00:03<00:00,  5.20it/s]\nDDIM Sampler:  90%|█████████ | 18/20 [00:03<00:00,  5.19it/s]\nDDIM Sampler:  95%|█████████▌| 19/20 [00:03<00:00,  5.19it/s]\nDDIM Sampler: 100%|██████████| 20/20 [00:03<00:00,  5.20it/s]\nDDIM Sampler: 100%|██████████| 20/20 [00:03<00:00,  5.19it/s]\n",
    "output": [
        "https://replicate.delivery/yhqm/xaruXyR8JSIlM9xDCDgFsAMey1f41wLqfVglUlZsAHyEhfwOB/output_0.png",
        "https://replicate.delivery/yhqm/d3YmOPr8zM4AK1tGzfFO3MwAbUBVKduGeNDyriZdDSViwPsTA/output_1.png"
    ],
    "data_removed": false,
    "error": null,
    "status": "succeeded",
    "created_at": "2024-10-31T09:13:02.089Z",
    "started_at": "2024-10-31T09:13:02.113742407Z",
    "completed_at": "2024-10-31T09:13:06.252152529Z",
    "urls": {
        "cancel": "https://api.replicate.com/v1/predictions/4d9hwh45h5rj60cjw7cs9zf8ag/cancel",
        "get": "https://api.replicate.com/v1/predictions/4d9hwh45h5rj60cjw7cs9zf8ag",
        "stream": "https://stream.replicate.com/v1/files/qoxq-ayuasuf2nw6yyg3mvlwakpaj3trbhvjkmzbzaexkmo4h7kzxwc6a"
    },
    "metrics": {
        "predict_time": 4.138410211
    }
}

export const CreateForm = function ({ model }: { model: string }) {

    const defaultValue = StyleOptions[0].value
    const mode = ModleMap[model] ? model : 'exterior-house-remodel'
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [resStyle, setResStyle] = useState(defaultValue)

    const [prediction, setPrediction] = useState<Prediction | null>(data);
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
                        style={{ width: '100%' }}
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
                    style={{ width: '100%', marginTop: 16 }}
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
            {/* {prediction && (
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
            )} */}
            {prediction && prediction.output && imageUrl && (
                <div>
                    <Button icon={<DeleteOutlined />} type='text' danger title='clear the result ?' onClick={onClearClick}>
                    </Button>
                    <div className='juxtapose-wrapper' style={{ width: 700, height: 600 }}>
                        <div id="juxtapose" />
                        <Juxtapose before={imageUrl} after={prediction.output[prediction.output.length - 1]} />
                    </div>
                </div>
            )}
        </>

    )
}