import { createLazyFileRoute } from '@tanstack/react-router'
import { Flex, styled } from '#styled-system/jsx'
import { css } from '#styled-system/css'

const Index = () => {
  return (
    <div>
      <Flex
        className={css({
          textStyle: 'display-md',
          bgColor: 'artwork.decorative.blueFrance',
        })}
        flexDirection="column"
      >
        <a href="" className={css({})}>
          salut
        </a>
        <styled.h1 color="blue !important">Compte rendu vif</styled.h1>
        <p>Le compte rendu vif est un outil de prise de note collaborative et en temps réel.</p>
        <p>Il permet de rédiger des notes, de les commenter et de les partager.</p>
      </Flex>
    </div>
  )
}

export const Route = createLazyFileRoute('/')({
  component: Index,
})
