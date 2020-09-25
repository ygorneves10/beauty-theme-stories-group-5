import React, { useEffect } from 'react'
import { useDevice } from 'vtex.device-detector'
import { NoSSR } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import { product as queryProduct } from 'vtex.store-resources/Queries'

interface Content {
  action: Function
  isPaused?: boolean
}

interface StorieComponentProps extends Content, StorieItem {}

interface StorieItem {
  sku: string
  image: string
  behavior: 'swipe-up' | 'add-to-cart'
}

interface Storie {
  image: string
  storiesItems: StorieItem[]
  title: string
}

interface StoriesComponentProps {
  stories: Storie[]
}

const StorieComponent = ({
  action,
  image,
  behavior,
  sku,
}: StorieComponentProps) => {
  const time = 7000

  const storieAction = (action: Function): any =>
    setTimeout(() => {
      action('play')
    }, time)

  useEffect(() => {
    console.log('BEHAVIOR => ', behavior)
    console.log('SKU => ', sku)
    storieAction(action)
  }, [action, behavior, sku])

  return <img src={image} width="100%" alt="Imagem" />
}

const StoriesComponent = (props: StoriesComponentProps) => {
  const { isMobile } = useDevice()
  if (!isMobile) {
    return null
  }
  const Stories = React.lazy(() => import('react-insta-stories'))
  const { stories } = props

  const { loading, data, error } = useQuery(queryProduct, {
    variables: {
      identifier: {
        field: 'id',
        value: 40,
      },
    },
  })

  if (loading || error || !data) {
    return null
  }

  console.log(data.product)

  const CSS_HANDLES = ['stories'] as const

  const handles = useCssHandles(CSS_HANDLES)

  return stories?.length
    ? stories.map(({ image, title, storiesItems }: Storie) => {
        const storiesArr = storiesItems.map(
          ({ image, behavior, sku }: StorieItem) => ({
            content: ({ action }: Content) => (
              <StorieComponent
                action={action}
                image={image}
                behavior={behavior}
                sku={sku}
              />
            ),
          })
        )

        return (
          <>
            <img src={image} />
            <p>{title}</p>
            <div className={handles.stories}>
              <NoSSR onSSR={() => null}>
                <React.Suspense fallback={<div>Carregando...</div>}>
                  {storiesArr?.length && (
                    <Stories
                      loop
                      stories={storiesArr}
                      width={432}
                      height={768}
                    />
                  )}
                </React.Suspense>
              </NoSSR>
            </div>
          </>
        )
      })
    : null
}

StoriesComponent.schema = {
  title: 'Stories Component',
  description: 'Componente de stories',
  type: 'object',
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
              'ui:widget': 'image-uploader',
            },
          },
          title: {
            type: 'string',
            title: 'Title',
            default: '',
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
                  default: '',
                },
                image: {
                  type: 'string',
                  title: 'Image',
                  default: '',
                  widget: {
                    'ui:widget': 'image-uploader',
                  },
                },
                behavior: {
                  type: 'string',
                  enum: ['swipe-up', 'add-to-cart'],
                },
              },
            },
          },
        },
      },
    },
  },
}

export default StoriesComponent
