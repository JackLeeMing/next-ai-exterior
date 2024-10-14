import './page.scss'
import { Button } from 'antd'
import { CreateForm } from '@/components/form/CreateForm'
// import Image from 'next/image';
import Link from 'next/link'

export default function Home() {
    return <div className='create-page'>
        <div className='left-menus flex flex-col gap-10'>
            <div className='pad-top'></div>
            <div className='btn-item'>
                <Link href="/">
                    <Button type='primary' size='large' style={{ width: 150, height: 52 }}>
                        Homepage
                    </Button>
                </Link>
            </div>
            <div className='btn-item'>
                <Link href="/cases">
                    <Button type='primary' size='large' style={{ width: 150, height: 52 }}>
                        Cases
                    </Button>
                </Link>
            </div>
            <div className='btn-item'>
                <Link href="/blog">
                    <Button type='primary' size='large' style={{ width: 150, height: 52 }}>
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