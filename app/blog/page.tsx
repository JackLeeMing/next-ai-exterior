
import Link from "next/link";
import Image from "next/image";
import "./page.scss";

export default function BlogPage() {

    return <div className="blog-page flex flex-col">
        <section className="section-item blog-page-section-s1">
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
                    <Link href="/house-redesign-case">
                        <div>Cases</div>
                    </Link>
                    <Link href="#">
                        <div>Blog</div>
                    </Link>
                </div>
            </header>
        </section>
    </div>
}