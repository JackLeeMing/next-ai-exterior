'use client'
import { Card, Rate } from "antd";
import Image from "next/image";
const { Meta } = Card;

type HomeCardProps = {
    cards: { img: string, title: string, description: string }[]
}
export const HomeCardList = function ({ cards = [] }: HomeCardProps) {
    return <div className="center-home-cards flex gap-8">
        {
            cards.map((card, index) =>
                <Card
                    key={`card-${index}`}
                    hoverable
                    style={{ width: 360, flex: '0 0 360px' }}
                    cover={
                        <Image
                            src={card.img}
                            width={360}
                            height={0}
                            alt="result"
                            priority
                        />
                    }>
                    <Meta
                        title={card.title}
                        description={card.description}
                    />
                </Card>
            )
        }
    </div>
}


type UserCardProps = {
    users: { img: string, comment: string, username: string, userDesc: string, rate: number }[]
}


export const UserCardList = function ({ users }: UserCardProps) {
    return <>
        <div className="user-list-card">
            {
                users.map((user, index) =>
                    <div key={`${user.username}-${index}`}
                        className="user-card-item">
                        <div className="quote">&ldquo;</div>
                        <div className="content">
                            {user.comment}
                        </div>
                        <div className="user-avatar">
                            <Image
                                src={user.img}
                                width={50.5}
                                height={46}
                                alt="before"
                                priority
                            />
                            <div className="user-info">
                                <div className="username"> {user.username}</div>
                                <div className="user-desc">{user.userDesc}</div>
                            </div>
                        </div>
                        <div className="user-star">
                            <Rate allowHalf defaultValue={user.rate} />
                        </div>
                    </div>)
            }
        </div>
    </>
}