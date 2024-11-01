
import Image from "next/image";
import Link from "next/link";
import { SiteIcons } from '@/components/site/Site'
import { CaseItem } from '@/components/cases/CaseItem'
import { cases } from '@/lib/data'
import "./page.scss";

type Props = {
    params?: {
        caseMode: string;
    }
}

// const fitPath = ['house-redesign-case', 'modern-style', 'mediterranean-style', 'victorian-style']
export default function CasesPage(props: Props) {
    const params = props.params
    const caseMode = params?.caseMode || 'house-redesign-case'
    //house-redesign-case
    const fitCases = cases.filter(_c => _c.path.includes(caseMode))
    return (
        <div className="cases-page flex flex-col">
            <section className="section-item cases-page-section-s1">
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
                            <Link href="/">
                                <div>Home</div>
                            </Link>
                            <Link href="/ai-home-design/exterior-house-remodel">
                                <div>Create</div>
                            </Link>
                            <Link href="#">
                                <div>Cases</div>
                            </Link>
                            <Link href="/blog">
                                <div style={{ display: 'none' }}>Blog</div>
                            </Link>
                        </div>
                        <span style={{ display: 'none' }}>{caseMode}</span>
                    </header>
                    <div className="left-panel-content flex flex-col">
                        <div className="title">User Design Cases</div>
                        <p className="desc" style={{ width: 480 }}>
                            With AI, we can analyze your home&rsquo;s unique characteristics and your personal style preferences to create a customized remodeling plan.
                        </p>
                        <Image
                            src="/images/cases/quality.png"
                            width={250}
                            height={0}
                            alt="before"
                            priority
                        />
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
            </section>
            <section className="section-item cases-page-section-s2">
                {
                    fitCases.map((caseData, index) =>
                        <CaseItem
                            caseData={caseData}
                            key={`case-example-${index}`}
                            showPredix={caseMode === 'house-redesign-case'} />)
                }
            </section>
            <section className="section-item cases-page-section-s3">
                <div className="fotter-padding"></div>
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
                            <Link href="/">
                                <div className="menu-item">Homepage</div>
                            </Link>
                            <Link href="/ai-home-design/exterior-house-remodel">
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
                            <Link href="/">
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
        </div>
    );
}
