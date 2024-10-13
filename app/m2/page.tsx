
import './page.scss'
import Image from 'next/image';
import Link from 'next/link'
export default function Home() {
  return (
    <div className="home-page flex flex-col">
      <section className='home-page-section1'>
        <div className='left-panel'>
          <header>
            <Image src="/images/result/result@2x.png" width={84} height={38} alt='result' priority />
            <div className='memus flex gap-8'>
              <Link href='#'>
                <div>Home</div>
              </Link>
              <Link href='#'>
                <div>Create</div>
              </Link>
              <Link href='#'>
                <div>Cases</div>
              </Link>
              <Link href='#'>
                <div>Blog</div>
              </Link>
            </div>
          </header>
          <div className='left-panel-content flex flex-col'>
            <div className='title'>
              AI in Exterior House Remodel
            </div>
            <p className='desc'>
              AI-driven Exterior House Remodel. Get personalized designs,optimized materials, and a flawless finisg for your home. You can remodel your
              house of exterior, interior in seconds. Make your vision come true with out AI.
            </p>
            <div className='opt-buttons'>
              <div className='opt1'>Get Started</div>
              <div className='opt2'>Check the Case</div>
            </div>
          </div>
        </div>
        <div className='right-panel'>
          <header>
            <div className='flex gap-8'>
              <Link href='#'>
                <div className='log-in'>Log In</div>
              </Link>
              <Link href='#'>
                <div className='sign-up'>Sign Up</div>
              </Link>
            </div>
          </header>
        </div>
        <div className='float-images'>
          <div className='float-images-item'>
            <div className='badge'>
              <span className='text'>Before</span>
            </div>
            <Image src="/images/before/before@2x.png" width={213.62} height={162.63} alt='before' priority />
          </div>
          <div className='float-images-item'>
            {/* <div className='badge'>
              <span className='text'>After</span>
            </div> */}
            <Image src="/images/after/after@2x.png" width={213.62} height={162.63} alt='after' priority />
          </div>
        </div>
        <div className='float-badge'>
          <Image src="/images/like/badge@2x.png" width={30} height={30} alt='badge' priority />
        </div>
      </section>
      <section>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="w-32 h-32 bg-blue-500">
          </div>
        </main>
      </section>
      <section></section>
      <section>
        <footer>
          <div className='fotter-left'>
            Copyrights, Medkit, 2023 All rights reserved.
          </div>
          <div className='fotter-right'>
            Privacy & Policy I Terms & Conditions
          </div>
        </footer>
      </section>
    </div>
  );
}
