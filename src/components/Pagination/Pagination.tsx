import { ReactNode } from 'react';

interface Props
{
  gotoNextPage: (() => void) | null;
  gotoPreviousPage: (() => void) | null;
}

export default function Pagination({
  gotoNextPage,
  gotoPreviousPage,
}: Props): ReactNode
{
  return (
    <div>
      { gotoPreviousPage && <button
        onClick={ gotoPreviousPage }
      >
        Previous
      </button> }
      { gotoNextPage && <button
        onClick={ gotoNextPage }
      >
        Next
      </button> }
    </div>
  )
}
