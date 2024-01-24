'use client'

type Props = {
    tag: string
}

export default function RevalidateButton({tag}: Props) {
    const handleClick = async() => {
        await fetch(`/api/revalidate?tag=${tag}`, { method: 'POST' })
    }

    return <button onClick={handleClick}>캐시 비우기</button>
}