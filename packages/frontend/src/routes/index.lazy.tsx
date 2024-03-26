import { createLazyFileRoute } from '@tanstack/react-router'
import { Flex, styled } from '#styled-system/jsx'
import { css } from '#styled-system/css'
import { db } from '../db'
import { useEffect } from 'react'
import { useQuery } from '@triplit/react'

const query = db.query('clauses')

const Index = () => {
  const { results, fetching, error } = useQuery(db, query)

  console.log(results, fetching, error)

  return (
    <div>
      <button
        onClick={() =>
          db.insert('clauses', {
            label: 'Clause 1',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          })
        }
      >
        Add
      </button>
      <Flex
        className={css({
          textStyle: 'display-md',
          color: 'artwork.background.blueCumulus',
          bgColor: 'artwork.decorative.blueFrance',
        })}
        flexDirection="column"
      >
        <a
          href=""
          className={css({ color: 'background.actionHigh.beigeGrisGalet', bgColor: 'background.actionHigh.blueEcume' })}
        >
          salut
        </a>
        <styled.h1 color="blue">Compte rendu vif</styled.h1>
        <p>Le compte rendu vif est un outil de prise de note collaborative et en temps réel.</p>
        <p>Il permet de rédiger des notes, de les commenter et de les partager.</p>
      </Flex>
    </div>
  )
}

export const Route = createLazyFileRoute('/')({
  component: Index,
})
