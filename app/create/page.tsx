import './page.scss'
import { Button } from 'antd'
import { CreateForm } from '@/components/form/CreateForm'
import { HomeFilled, ProfileOutlined, CommentOutlined } from '@ant-design/icons'
// import Image from 'next/image';
import Link from 'next/link'

export default function Home() {
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
                <Link href="/cases">
                    <Button type='primary' size='large' style={{ width: 150, height: 52 }}
                        icon={
                            <ProfileOutlined />
                        }>
                        Cases
                    </Button>
                </Link>
            </div>
            <div className='btn-item' style={{display:'none'}}>
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
            <CreateForm />
        </div>
    </div>
}