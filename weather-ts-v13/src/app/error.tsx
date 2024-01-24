'use client'

import { useEffect } from 'react'

type Props = {
    error: Error
    reset: () => void
}

export default function Error({error, reset}: Props) {
    useEffect(() => {
        console.error('---', error.message)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            <h1>에러 페이지</h1>
            <button
                onClick={() => {
                    reset()
                }}
            >새로고침</button>
        </>
    )
}