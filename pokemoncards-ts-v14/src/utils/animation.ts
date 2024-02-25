export const MouseMoveHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, rarity: string, mask: string, foil: string) => {
  e.nativeEvent.stopImmediatePropagation();
  e.preventDefault();
  e.stopPropagation();
  const currentX = e.nativeEvent.offsetX;
  const currentY = e.nativeEvent.offsetY;

  const pointerFromCenter = (min = 0, max = 100) => {
    const value = Math.sqrt(((currentY - (459/2)) / (459/2)) ** 2 + ((currentX - (330/2)) / (330/2)) ** 2)
    return Math.min(Math.max(value, min), max);
  }

  const shine = e.currentTarget.getElementsByClassName('shine')[0] as HTMLElement

  switch (rarity) {
    case 'rare secret' :
      shine.style.content = ``;
      shine.style.maskImage = ``;
      shine.style.backgroundImage = `
        url(${foil}), 
        linear-gradient( 45deg, hsl(46, 95%, 50%), hsl(52, 100%, 69%) ), 
        radial-gradient( 
          farthest-corner circle at ${currentX}px ${currentY}px, 
          hsla(10, 20%, 90%, 0.95) 10%, 
          hsl(0, 0%, 0%) 70% 
        )`;
      shine.style.backgroundSize = 'cover, cover, cover';
      shine.style.backgroundPosition = 'center center, center center, center center'
      shine.style.backgroundBlendMode = 'hard-light, multiply'
      shine.style.mixBlendMode = 'lighten'
      shine.style.filter = 'brightness(1.25) contrast(1.25) saturate(0.35)'
      shine.style.opacity = '0.8'
      break;
    default:
      shine.style.maskImage = `url(${mask})`
      shine.style.maskSize = 'cover'
      shine.style.maskPosition = 'center center'
  }

  
  const rotateX = 40/330 * currentY - 20;
  const rotateY = -60/459 * currentX + 30;

  const overlay = e.currentTarget.getElementsByClassName('glare')[0] as HTMLElement
  overlay.style.transform = 'translateZ(1.41px)'
  overlay.style.overflow = 'hidden'
  overlay.style.backgroundImage = `radial-gradient(
    farthest-corner circle at ${currentX}px ${currentY}px,
    hsla(0, 0%, 100%, 0.8) 10%,
    hsla(0, 0%, 100%, 0.65) 20%,
    hsla(0, 0%, 0%, 0.5) 90%
  )`
  // overlay.style.opacity = '0.8'
  overlay.style.mixBlendMode = 'hard-light';

  overlay.style.filter = 'brightness(.9) contrast(2)';
  overlay.style.opacity = `${(pointerFromCenter(0, 1) + 0.2) * 0.5}`;
        
  const container = e.currentTarget as HTMLElement
  container.style.transition = '0.1s'
  container.style.transform = `perspective(750px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

export const MouseOutHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, rarity: string, mask: string) => {
  e.stopPropagation();
  const shine = e.currentTarget.getElementsByClassName('shine')[0] as HTMLElement
  shine.style.transition = 'all 0.3s ease';

  switch (rarity) {
    case 'rare secret' :
      shine.style.backgroundImage = `
        var(--glitter), 
        var(--glitter), 
        conic-gradient( 
          var(--sunpillar-clr-4), 
          var(--sunpillar-clr-5),
          var(--sunpillar-clr-6), 
          var(--sunpillar-clr-1), 
          var(--sunpillar-clr-4) 
        ), 
        radial-gradient( 
          farthest-corner circle at var(--pointer-x) var(--pointer-y), 
          hsla(150, 00%, 0%, .98) 10%, 
          hsla(0, 0%, 95%, .15) 90% 
        )
      `
      shine.style.backgroundSize = `var(--glittersize) var(--glittersize), var(--glittersize) var(--glittersize), cover, cover`;
      shine.style.backgroundPosition = `45% 45%, 55% 55%, center center, center center`;
      shine.style.backgroundBlendMode = `soft-light, hard-light, overlay`;
      shine.style.mixBlendMode = `color-dodge`;
      break;
    default:
      shine.style.maskImage = `url(${mask})`
      shine.style.maskSize = 'cover'
      shine.style.maskPosition = 'center center'
  }

  const overlay = e.currentTarget.getElementsByClassName('glare')[0] as HTMLElement
  overlay.style.opacity = `0`
  const container = e.currentTarget as HTMLElement
  container.style.transition = '0.6s'
  container.style.transform = `perspective(750px) rotateX(0deg) rotateY(0deg)`
}