import React, { useEffect } from 'react'
import { NoSSR } from 'vtex.render-runtime'

interface Content {
    action: any
    isPaused?: any
}

const StoriesComponent = () => {
    const Stories = React.lazy(() => import('react-insta-stories'))
    const time = 7000

    const storieAction = (action: Function): any =>
        setTimeout(() => {
            action('play')
        }, time)

    const stories = [
        {
            content: ({ action }: Content) => {
                useEffect(() => {
                    storieAction(action)
                }, [])

                return (
                    <img
                        src="https://i.picsum.photos/id/133/1080/1920.jpg?hmac=mw1-3qObjR9g0YZA8jbk2BvlgH6t4o1xWCCT44KC9PA"
                        width="100%"
                        alt="Imagem"
                    />
                )
            },
        },
        {
            content: ({ action }: Content) => {
                useEffect(() => {
                    storieAction(action)
                }, [])

                return (
                    <img
                        src="https://i.picsum.photos/id/15/1080/1920.jpg?hmac=fVtH2bkFLY2ifCJ7-1DNqSXoH2nmDeOEYsdgXsLVSjk"
                        width="100%"
                        alt="Imagem"
                    />
                )
            },
        },
        {
            content: ({ action }: Content) => {
                useEffect(() => {
                    storieAction(action)
                }, [])

                return (
                    <img
                        src="https://i.picsum.photos/id/485/1080/1920.jpg?hmac=bylnefLFXgDQo5wKMp5p5jYCzJJaJ_a3lGpat-NW7y0"
                        width="100%"
                        alt="Imagem"
                    />
                )
            },
        }
    ]

    return (
        <NoSSR>
            <React.Suspense fallback={<div>Carregando...</div>}>
                <Stories loop stories={stories} width={432} height={768} />
            </React.Suspense>
        </NoSSR>
    )
}

export default StoriesComponent
