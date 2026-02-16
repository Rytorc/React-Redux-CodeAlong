import React from 'react'
import EntryLine from './EntryLine'
import { Container } from 'semantic-ui-react'

function EntryLines({entries, editEntry}) {
  return (
    <Container>
        {entries.map(entry =>
            <EntryLine 
            key = {entry.id}
            {...entry}
            editEntry = {editEntry}
            />
        )}
    </Container>
  )
}

export default EntryLines