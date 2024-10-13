'use client'
import { Card, Rate, Row, Col } from "antd";
import Image from "next/image";
const { Meta } = Card;

type HomeCardProps = {
    cards: { img: string, title: string, description: string }[]
}
export const HomeCardList = function ({ cards = [] }: HomeCardProps) {
    return <Row gutter={16}>
        {
            cards.map((card, index) =>
                <Col key={`card-${index}`} span={8}>
                    <Card
                        hoverable
                        style={{ width: 360 }}
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
                </Col>
            )
        }
    </Row>
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