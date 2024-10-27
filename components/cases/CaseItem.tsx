

import Image from "next/image";

type Props = {
    caseData: { title: string, before: string, after: string, titlePrefix: string },
    showPredix: boolean
}
export const CaseItem = function ({ caseData, showPredix }: Props) {
    return (
        <div className="cases-item">
            <h3 className="case-title">{showPredix ? caseData.titlePrefix + caseData.title : caseData.title}</h3>
            <div className="case-content">
                <div className="case-wind case-before">
                    <div className='case-tag'>Before</div>
                    <Image
                        className="case-img"
                        src={caseData.before}
                        width={500}
                        height={500}
                        alt="result"
                        priority
                    />
                </div>
                <div className="case-wind case-after">
                    <div className='case-tag'>After</div>
                    <Image
                        className="case-img"
                        src={caseData.after}
                        width={500}
                        height={500}
                        alt="result"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}