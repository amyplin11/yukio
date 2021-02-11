import React from 'react'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { graphql } from 'gatsby'

import { Colors } from 'src/styles/colors'
import { PageContainer } from 'src/components/page-container'
import { Container, Paper } from 'src/components/layouts.styled'
import { NavigationLinks } from 'src/components/navigation-links'
import { SourceLink } from 'src/components/source-link.styled'
import { Widths } from 'src/styles/widths'

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        images {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        sources {
          title
          href
        }
      }
    }
  }
`
const Text = styled.span`
  color: black;
  font-family: monospace;
  font-size: 16px;
  line-height: 26px;
`

const Title = styled.h1`
  font-size: 30px;
  font-family: monospace;
  font-weight: 500;
  color: black;
  z-index: 1;

  @media only screen and (min-width: ${Widths.SmallScreen}px) {
    font-size: 40px;
  }
`

export default function BlogPost({ data, pageContext }) {
  const post = data.markdownRemark
  const { prev, next } = pageContext
  const { title, sources } = post.frontmatter

  return (
    <PageContainer linkColor={Colors.Green500}>
      <Global
        styles={css`
          html {
            color: ${Colors.Green500};
            background-color: ${Colors.White};
          }
        `}
      />
      <Container>
        <Title>{title}</Title>

        <Paper>
          <Text dangerouslySetInnerHTML={{ __html: post.html }} />

          <b>
            <Text>Sources:</Text>
          </b>
          <div>
            {sources.map(({ title, href }) => (
              <p>
                <SourceLink target="_blank" href={href}>
                  {title} ({href})
                </SourceLink>
              </p>
            ))}
          </div>
        </Paper>

        <NavigationLinks prev={prev} next={next} />
      </Container>
    </PageContainer>
  )
}
