import { useEffect, useRef } from "react"

export function LyricsDisplay({lyrics, currentLyricIndex, scrollContainerRef, autoScroll= true}) {

  const currentLyricRef = useRef(null)
  
  useEffect(() => {
    if (autoScroll && scrollContainerRef.current && currentLyricRef.current) {
      scrollContainerRef.current.scrollTo({
        top: currentLyricRef.current.offsetTop - scrollContainerRef.current.clientHeight / 2,
        behavior: 'smooth',
      })
    }
  }, [lyrics, currentLyricIndex, scrollContainerRef, autoScroll])

  return (
    <div>
      {lyrics.map((line, index) => {
        return (
          <h3 ref={index === currentLyricIndex ? currentLyricRef : null} key={index} id={`lyric-${index}`} style={{
              color: 'white',
              fontSize: index === currentLyricIndex ? '1.4em' : '1em',
            }}>
            {line.text}
          </h3>
        )
      })}
    </div>

  )
}