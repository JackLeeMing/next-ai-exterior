import './page.scss'
import clsx from 'clsx'
import { Button } from 'antd'
import { CreateForm } from '@/components/form/CreateForm'
import { HomeFilled, ProfileOutlined, CommentOutlined, BorderOuterOutlined, BorderInnerOutlined } from '@ant-design/icons'
import Link from 'next/link'


type Props = {
    params?: {
        model: string;
    }
}

export default function Home(props: Props) {
    const params = props.params
    const model = params?.model || 'exterior-house-remodel'
    return <div className='create-page'>
        <div className='left-menus flex flex-col gap-10'>
            <div className='pad-top'></div>
            <div className='btn-item'>
                <Link href="/">
                    <Button type='primary' size='large' style={{ width: 150, height: 52 }}
                        icon={
                            <HomeFilled />
                        }>
                        Homepage
                    </Button>
                </Link>
            </div>
            <div className='btn-item'>
                <Link href="/ai-home-design/exterior-house-remodel">
                    <Button
                        type='primary' size='large' style={{ width: 150, height: 52 }}
                        className={clsx({ 'is-not-current': model === 'exterior-house-remodel' })}
                        icon={
                            <BorderOuterOutlined />
                        }>
                        Exterior
                    </Button>
                </Link>
            </div>
            <div className='btn-item'>
                <Link href="/ai-home-design/interior-house-remodel">
                    <Button
                        type='primary' size='large' style={{ width: 150, height: 52 }}
                        className={clsx({ 'is-not-current': model === 'interior-house-remodel' })}
                        icon={
                            <BorderInnerOutlined />
                        }>
                        Interior
                    </Button>
                </Link>
            </div>
            <div className='btn-item'>
                <Link href="/house-redesign-case">
                    <Button type='primary' size='large' style={{ width: 150, height: 52 }}
                        icon={
                            <ProfileOutlined />
                        }>
                        Cases
                    </Button>
                </Link>
            </div>
            <div className='btn-item' style={{ display: 'none' }}>
                <Link href="/blog">
                    <Button type='primary' size='large' style={{ width: 150, height: 52 }}
                        icon={
                            <CommentOutlined />
                        }>
                        Blog
                    </Button>
                </Link>
            </div>
        </div>
        <div className='center-split'></div>
        <div className='right-form flex flex-col'>
            <CreateForm model={model} />
        </div>
    </div>
}