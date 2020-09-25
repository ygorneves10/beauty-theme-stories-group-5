import React, { useEffect } from 'react'
import { NoSSR } from 'vtex.render-runtime'

interface Content {
    action: Function
    isPaused?: boolean
}

interface StorieProps {
    img: string
    behavior: string
}

interface StorieComponentProps extends Content, StorieProps { }

const StorieComponent = ({ action, img, behavior }: StorieComponentProps) => {
    const time = 7000

    const storieAction = (action: Function): any => setTimeout(() => { action('play') }, time)

    useEffect(() => {
        console.log("BEHAVIOR => ", behavior)
        storieAction(action)
    }, [])

    return (
        <img
            src={img}
            width="100%"
            alt="Imagem"
        />
    )
}

const StoriesComponent = () => {
    const Stories = React.lazy(() => import('react-insta-stories'))

    const stories = [
        {
            img: "https://i.picsum.photos/id/133/1080/1920.jpg?hmac=mw1-3qObjR9g0YZA8jbk2BvlgH6t4o1xWCCT44KC9PA",
            behavior: "add-to-cart"
        },
        {
            img: "https://i.picsum.photos/id/15/1080/1920.jpg?hmac=fVtH2bkFLY2ifCJ7-1DNqSXoH2nmDeOEYsdgXsLVSjk",
            behavior: "swipe-up"
        },
        {
            img: "https://i.picsum.photos/id/485/1080/1920.jpg?hmac=bylnefLFXgDQo5wKMp5p5jYCzJJaJ_a3lGpat-NW7y0",
            behavior: "add-to-cart"
        }
    ].map(({ img, behavior }: StorieProps) => (
        {
            content: ({ action }: Content) => <StorieComponent action={action} img={img} behavior={behavior} />
        }
    ))

    return (
        <NoSSR onSSR={() => null}>
            <React.Suspense fallback={<div>Carregando...</div>}>
                {stories?.length && <Stories loop stories={stories} width={432} height={768} />}
            </React.Suspense>
        </NoSSR>
    )
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
