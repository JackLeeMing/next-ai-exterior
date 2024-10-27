import Image from "next/image";
import Link from "next/link";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { HomeCardList, UserCardList } from '@/components/cards/CardList'
import { SiteIcons } from '@/components/site/Site'
import { cards, users } from '@/lib/data'
import './home.scss'

export default function HomeContent() {

    return (
        <>
            <section className="section-item home-page-section-s1">
                <div className="left-panel">
                    <header>
                        <Image
                            src="/images/result/result@2x.png"
                            width={84}
                            height={38}
                            alt="result"
                            priority
                        />
                        <div className="memus flex gap-8">
                            <Link href="#">
                                <div>Home</div>
                            </Link>
                            <Link href="/ai-home-design">
                                <div>Create</div>
                            </Link>
                            <Link href="/house-redesign-case">
                                <div>Cases</div>
                            </Link>
                            <Link href="/blog">
                                <div style={{ display: 'none' }}>Blog</div>
                            </Link>
                        </div>
                    </header>
                    <div className="left-panel-content flex flex-col">
                        <div className="title">AI in Exterior House Remodel</div>
                        <p className="desc">
                            AI-driven Exterior House Remodel. Get personalized
                            designs,optimized materials, and a flawless finisg for your home.
                            You can remodel your house of exterior, interior in seconds. Make
                            your vision come true with out AI.
                        </p>
                        <div className="opt-buttons">
                            <Link href="/ai-home-design">
                                <div className="opt1">Get Started</div>
                            </Link>

                            <Link href="/house-redesign-case">
                                <div className="opt2">Check the Case</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="right-panel">
                    <div className="right-decoration"></div>
                    <header className="right-panel-top">
                        <div className="flex gap-8" style={{ zIndex: 10, display: 'none' }}>
                            <Link href="#">
                                <div className="log-in">Log In</div>
                            </Link>
                            <Link href="#">
                                <div className="sign-up">Sign Up</div>
                            </Link>
                        </div>
                    </header>
                </div>
                <div className="float-images">
                    <div className="float-images-item">
                        <div className="badge">
                            <span className="text">Before</span>
                        </div>
                        <Image
                            src="/images/before/before@2x.png"
                            width={214}
                            height={163}
                            alt="before"
                            priority
                        />
                    </div>
                    <div className="float-images-item">
                        <div className="badge">
                            <span className="text">After</span>
                        </div>
                        <Image
                            src="/images/after/after@2x.png"
                            width={214}
                            height={163}
                            alt="after"
                            priority
                        />
                    </div>
                </div>
                <div className="float-badge">
                    <Image
                        src="/images/like/badge@2x.png"
                        width={30}
                        height={30}
                        alt="badge"
                        priority
                    />
                </div>
                <Image
                    className="float-flag-image"
                    src="/images/others/float-flag.png"
                    width={382.265}
                    height={181.59}
                    alt="badge"
                    priority
                />
            </section>
            <section className="section-item home-page-section-s2">
                <h3 className="h3-title">AI Exterior House Remodel</h3>
                <div className="images-flags">
                    <div className="item-normal">
                        <Image
                            src="/images/user1.png"
                            width={42}
                            height={42}
                            alt="before"
                            priority
                        />
                        <p>
                            Customization Unleash Your Creativity with Tailored Exterior
                            Designs
                        </p>
                    </div>
                    <div className="item-normal">
                        <Image
                            src="/images/user2.png"
                            width={42}
                            height={42}
                            alt="before"
                            priority
                        />
                        <p>Real-Time Visualization and 3D Modeling with AI</p>
                    </div>
                    <div className="item-normal">
                        <Image
                            src="/images/user3.png"
                            width={42}
                            height={42}
                            alt="before"
                            priority
                        />
                        <p>
                            Multiple Styles Explore a Diverse Palette of Exterior Aesthetics
                        </p>
                    </div>
                    <div className="item-normal">
                        <Image
                            src="/images/user4.png"
                            width={42}
                            height={42}
                            alt="before"
                            priority
                        />
                        <p>
                            High Quality Experience Excellence in Exterior Remodeling Results
                        </p>
                    </div>
                </div>
                <div className="images-think">
                    <Image
                        src="/images/girl.png"
                        width={184.5 * 2.5}
                        height={221.375 * 2.5}
                        alt="before"
                        priority
                    />
                    <div className="images-think-list">
                        <div className="p p1">Why should people choose</div>
                        <div className="p p2">AI Exterior House Remodel?</div>
                        <ul className="thinks-list">
                            <li>
                                <div className="thinks-list-header">
                                    <Image
                                        src="/images/circle.png"
                                        width={16}
                                        height={16}
                                        alt="before"
                                        priority
                                    />
                                    <div className="thinks-list-header_title">
                                        Innovative Design & Visualization
                                    </div>
                                </div>
                                <p>
                                    AI offers creative ideas and realistic previews. You can
                                    explore and customize, resulting in a unique and stunning
                                    exterior.
                                </p>
                            </li>
                            <li>
                                <div className="thinks-list-header">
                                    <Image
                                        src="/images/circle.png"
                                        width={16}
                                        height={16}
                                        alt="before"
                                        priority
                                    />
                                    <div className="thinks-list-header_title">
                                        Precision & Personalization
                                    </div>
                                </div>
                                <p>
                                    AI streamlines remodeling, reducing time and cost. It
                                    optimizes materials and scheduling, delivering a affordable
                                    transformation.
                                </p>
                            </li>
                            <li>
                                <div className="thinks-list-header">
                                    <Image
                                        src="/images/circle.png"
                                        width={16}
                                        height={16}
                                        alt="before"
                                        priority
                                    />
                                    <div className="thinks-list-header_title">
                                        Online checking
                                    </div>
                                </div>
                                <p>
                                    Here you can check all test result using our website, moblie
                                    application. So just check it.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="section-item home-page-section-s3">
                <div className="header">
                    <div className="header-text">
                        What our beloved <span className="high-light">users</span>
                    </div>
                    <div className="header-text">say about us</div>
                    <div className="arrow-group">
                        <LeftCircleOutlined color="#56AB97" />
                        <RightCircleOutlined color="#56AB97" />
                    </div>
                </div>
                <UserCardList users={users} />
            </section>
            <section className="section-item home-page-section-s4">
                <div className="header">
                    <div className="high-light">Easy & Fast Remodel Exterior House</div>
                    <div className="normal">Multiples Exterior Design Styles</div>
                </div>
                <HomeCardList cards={cards} />
                <div className="fotter-menus">
                    <div className="col-1">
                        <Image
                            src="/images/result/result@2x.png"
                            width={84}
                            height={38}
                            alt="result"
                            priority
                        />
                        <p className="site-desc">
                            AI Exterior House Remodel Help you renew your house in seconds
                        </p>
                        <SiteIcons />
                    </div>
                    <div className="col-2">
                        <h1 className="title menu">Menu</h1>
                        <div className="menus flex flex-col">
                            <Link href="#">
                                <div className="menu-item">Homepage</div>
                            </Link>
                            <Link href="/ai-home-design">
                                <div className="menu-item">AI Generate HomeDesign</div>
                            </Link>
                            <Link href="/house-redesign-case">
                                <div className="menu-item">Design Cases</div>
                            </Link>
                            <Link href="/blog">
                                <div style={{ display: 'none' }} className="menu-item">Blog</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-3">
                        <h1 className="title features">Features</h1>
                        <div className="menus flex flex-col">
                            <Link href="/ai-home-design/exterior-house-remodel">
                                <div className="menu-item">Exterior house remodel</div>
                            </Link>
                            <Link href="/ai-home-design/interior-house-remodel">
                                <div className="menu-item">Interior house remodel</div>
                            </Link>
                            <Link href="#">
                                <div className="menu-item">Redesign home</div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-4">
                        <h1 className="title user-cases">User cases</h1>

                        <div className="menus flex flex-col">
                            <Link href="/modern-style">
                                <div className="menu-item">Remodel to Modern Style</div>
                            </Link>
                            <Link href="/mediterranean-style">
                                <div className="menu-item">Remodel to Mediterranean style</div>
                            </Link>
                            <Link href="/victorian-style">
                                <div className="menu-item">Remodel to Victorian style</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="fotter-left">
                        Copyrights, Medkit, 2023 All rights reserved.
                    </div>
                    <div className="fotter-right">
                        Privacy & Policy I Terms & Conditions
                    </div>
                </footer>
            </section>
        </>
    );
}
