import React, { useEffect, useState } from 'react'
import { NoSSR } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
// import { useQuery } from 'react-apollo'
// import { product as queryProduct } from 'vtex.store-resources/Queries'
import { Swipe } from "react-swipe-component"

interface Content {
    action: Function
    isPaused?: boolean
}

interface StorieComponentProps extends Content, StorieItem { }

interface StorieItem {
    sku: string
    image: string
    setCurrentStorie: Function
    behavior: "swipe-up" | "add-to-cart"
}

interface Storie {
    image: string
    storiesItems: Array<StorieItem>
    title: string
}

interface StoriesComponentProps {
    stories: Array<Storie>
}

const StorieComponent = ({ action, image, behavior, sku, setCurrentStorie }: StorieComponentProps) => {
    const time = 7000

    const storieAction = (action: Function): any => {
        setTimeout(() => {
            setCurrentStorie({ sku, behavior })
            action('play')
        }, time)
    }

    useEffect(() => {
        storieAction(action)
    }, [])

    return (
        <img src={image} width="100%" alt="Imagem" />
    )
}

const StoriesComponent = (props: StoriesComponentProps) => {
    const Stories = React.lazy(() => import('react-insta-stories'))

    const [storieOpen, setStorieOpen] = useState(0)
    const [currentStorie, setCurrentStorie] = useState({
        sku: null,
        behavior: null
    })

    const { stories } = props

    const CSS_HANDLES = [
        'stories',
        'swipe'
    ] as const

    const handles = useCssHandles(CSS_HANDLES)

    const onSwipeUpListener = () => {
        console.log("Swiped Up", currentStorie)
        if (currentStorie.behavior === "swipe-up") {
            console.log("Swiped Up", true)
        }
    }

    return stories?.length ? stories.map((storie, index) => {
        const { image, title, storiesItems }: Storie = storie
        const storiesArr = storiesItems.map(({ image, behavior, sku }: StorieItem) => (
            {
                content: ({ action }: Content) => <StorieComponent action={action} image={image} behavior={behavior} sku={sku} setCurrentStorie={setCurrentStorie} />
            }
        ))

        return (
            <>
                <div onClick={() => setStorieOpen(index + 1)}>
                    <img src={image} />
                    <p>{title}</p>
                </div>
                {
                    storieOpen && storieOpen === index + 1 ? (
                        <div className={handles.stories}>
                            <Swipe
                                nodeName="div"
                                className={handles.swipe}
                                onSwipedDown={() => setStorieOpen(0)}
                                onSwipedUp={onSwipeUpListener}
                            >
                                <NoSSR onSSR={() => null}>
                                    <React.Suspense fallback={<div>Carregando...</div>}>
                                        {storiesArr?.length && <Stories loop stories={storiesArr} width={432} height={768} />}
                                    </React.Suspense>
                                </NoSSR>
                            </Swipe>
                        </div>
                    ) : null
                }
            </>
        )
    }) : null
}

StoriesComponent.schema = {
    title: "Stories Component",
    description: "Componente de stories",
    type: "object",
    properties: {
        stories: {
            title: 'Stories Array',
            description: 'Stories Array',
            type: 'array',
            items: {
                title: 'Storie',
                type: 'object',
                properties: {
                    image: {
                        type: 'string',
                        title: 'Image',
                        default: '',
                        widget: {
                            'ui:widget': 'image-uploader'
                        }
                    },
                    title: {
                        type: 'string',
                        title: 'Title',
                        default: ''
                    },
                    storiesItems: {
                        title: 'Stories Items',
                        description: 'Stories Items Array',
                        type: 'array',
                        items: {
                            title: 'Storie',
                            type: 'object',
                            properties: {
                                sku: {
                                    type: 'string',
                                    title: 'SKU',
                                    default: ''
                                },
                                image: {
                                    type: 'string',
                                    title: 'Image',
                                    default: '',
                                    widget: {
                                        'ui:widget': 'image-uploader'
                                    }
                                },
                                behavior: {
                                    type: 'string',
                                    enum: ["swipe-up", "add-to-cart"]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default StoriesComponent
