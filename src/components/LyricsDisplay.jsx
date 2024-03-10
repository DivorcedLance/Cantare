export function LyricsDisplay({lyrics, currentLyricIndex}) {

  return (
    <div>
      {lyrics.map((line, index) => {
        return (
          <h3 key={index} style={{ 
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