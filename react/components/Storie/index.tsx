import React, { useEffect } from 'react'
import { NoSSR } from 'vtex.render-runtime'
import { useQuery } from 'react-apollo'
import { product as queryProduct } from 'vtex.store-resources/Queries'

interface Content {
  action: Function
  isPaused?: boolean
}

interface StorieProps {
  img: string
  behavior: string
}

interface StorieComponentProps extends Content, StorieProps {}

const StorieComponent = ({ action, img, behavior }: StorieComponentProps) => {
  const time = 7000

  const storieAction = (action: Function): any =>
    setTimeout(() => {
      action('play')
    }, time)

  useEffect(() => {
    console.log('BEHAVIOR => ', behavior)
    storieAction(action)
  }, [])

  const { loading, data, error } = useQuery(queryProduct, {
    variables: {
      identifier: {
        field: 'id',
        value: sku,
      },
    },
  })

  if (loading || error || !data) {
    return null
  }

  console.log(data.product)

  return <img src={img} width="100%" alt="Imagem" />
}

const StoriesComponent = () => {
  const Stories = React.lazy(() => import('react-insta-stories'))

  const stories = [
    {
      img:
        'https://i.picsum.photos/id/133/1080/1920.jpg?hmac=mw1-3qObjR9g0YZA8jbk2BvlgH6t4o1xWCCT44KC9PA',
      behavior: 'add-to-cart',
    },
    {
      img:
        'https://i.picsum.photos/id/15/1080/1920.jpg?hmac=fVtH2bkFLY2ifCJ7-1DNqSXoH2nmDeOEYsdgXsLVSjk',
      behavior: 'swipe-up',
    },
    {
      img:
        'https://i.picsum.photos/id/485/1080/1920.jpg?hmac=bylnefLFXgDQo5wKMp5p5jYCzJJaJ_a3lGpat-NW7y0',
      behavior: 'add-to-cart',
    },
  ].map(({ img, behavior }: StorieProps) => ({
    content: ({ action }: Content) => (
      <StorieComponent action={action} img={img} behavior={behavior} />
    ),
  }))

  return (
    <NoSSR>
      <React.Suspense fallback={<div>Carregando...</div>}>
        {stories?.length && (
          <Stories loop stories={stories} width={432} height={768} />
        )}
      </React.Suspense>
    </NoSSR>
  )
}

export default StoriesComponent
