'use client';

import altArts from "./alternate-arts.json";
import promosJson from "./promos.json";
import baseStyles from '../../public/css/cards/base.module.css';
import Image from "next/image";
import swshPikachuStyles from '../../public/css/cards/swsh-pikachu.module.css'
import { useState } from "react";
import { useAnimate } from "framer-motion";

const promos: any = promosJson;

type CardProps = {
  id : string
  name: string
  set: string
  number: string
  types: any // string[]
  supertype: string
  subtypes: string[]
  rarity: string
  isReverse: boolean
  showcase: boolean
  img?: string
  foil?: string
  mask?: string
}

export default function Card({
  id, name, set, number, types, supertype, subtypes, rarity, isReverse, showcase, img, foil, mask
} : CardProps) {
  
  function isDefined (v: any) {
    return typeof v !== "undefined" && v !== null;
  }

  /**
   * Shiny Vault Card (starts with sv)
   */
  const isShiny = isDefined(number) && number.toLowerCase().startsWith( "sv" );
  /**
   Trainer / Galar Gallery Card (not shiny)
   */
  const isGallery = isDefined(number) && !!number.match(/^[tg]g/i);
  /**
   Alternate Art Card (not shiny / gallery)
   */
  const isAlternate = isDefined(id) && altArts.includes( id ) && !isShiny && !isGallery;
  /**
   Promo Card
   */
  const isPromo = isDefined(set) && set === "swshp";

  if ( isReverse ) rarity = rarity + " Reverse Holo";

  if ( isGallery ) {
    if ( isDefined(rarity) && rarity.startsWith( "Trainer Gallery" ) ) {
      rarity = rarity.replace( /Trainer Gallery\s*/, "" );
    }
    if ( isDefined(rarity) && rarity.includes( "Rare Holo V" ) && isDefined(subtypes) && subtypes.includes("VMAX") ) {
      rarity = "Rare Holo VMAX";
    }
    if ( isDefined(rarity) && rarity.includes( "Rare Holo V" ) && isDefined(subtypes) && subtypes.includes("VSTAR") ) {
      rarity = "Rare Holo VSTAR";
    }
  }

  if ( isPromo ) {
    if ( id === "swshp-SWSH076" || id === "swshp-SWSH077" ) {
      rarity = "Rare Secret";
    } else if ( isDefined(subtypes) && subtypes.includes("V") ) {
      rarity = "Rare Holo V";
    } else if ( isDefined(subtypes) && subtypes.includes("V-UNION") ) {
      rarity = "Rare Holo VUNION";
    } else if ( isDefined(subtypes) && subtypes.includes("VMAX") ) {
      rarity = "Rare Holo VMAX";
    } else if ( isDefined(subtypes) && subtypes.includes("VSTAR") ) {
      rarity = "Rare Holo VSTAR";
    } else if ( isDefined(subtypes) && subtypes.includes("Radiant") ) {
      rarity = "Radiant Rare";
    }
  }

  function cardImage () {
    if ( isDefined( img ) ) {
      return img;
    }
    if ( isDefined( set ) && isDefined( number ) ) {
      return `https://images.pokemontcg.io/${ set.toLowerCase() }/${ number }_hires.png`;
    }
    return "";
  }

  function foilMaskImage ( prop: any, type = "masks" ) {
    let etch = "holo";
    let style = "reverse";
    let ext = "webp";
    if ( isDefined( prop ) ) {
      if ( prop === false ) {
        return "";
      }
      return prop;
    }
    if( !isDefined( rarity ) || !isDefined( subtypes ) || !isDefined( supertype ) || !isDefined( set ) || !isDefined( number ) ) {
      return "";
    }
    const fRarity = rarity.toLowerCase();
    const fNumber = number.toString().toLowerCase().replace( "swsh", "" ).padStart( 3, "0" );
    const fSet = set.toString().toLowerCase().replace( /(tg|gg|sv)/, "" );
    if ( fRarity === "rare holo" ) style = "swholo";
    if ( fRarity === "rare holo cosmos" ) style = "cosmos";
    if ( fRarity === "radiant rare" ) {
      etch = "etched";
      style = "radiantholo";
    }
    if ( fRarity === "rare holo v" || fRarity === "rare holo vunion" || fRarity === "basic v" ) {
      etch = "holo";
      style = "sunpillar";
    }
    if ( fRarity === "rare holo vmax" || fRarity === "rare ultra" || fRarity === "rare holo vstar" ) {
      etch = "etched";
      style = "sunpillar";
    }
    if ( fRarity === "amazing rare" || fRarity === "rare rainbow" || fRarity === "rare secret" ) {
      etch = "etched";
      style = "swsecret";
    }
    if ( isShiny ) {
      etch = "etched";
      style = "sunpillar";

      if ( fRarity === "rare shiny v" || (fRarity === "rare holo v" && fNumber.startsWith( "sv" )) ) {
        rarity = "Rare Shiny V";
      }

      if ( fRarity === "rare shiny vmax" || (fRarity === "rare holo vmax" && fNumber.startsWith( "sv" )) ) {
        style = "swsecret";
        rarity = "Rare Shiny VMAX";
      }

    }
    if ( isGallery ) {
      etch = "holo";
      style = "rainbow";
      if ( fRarity.includes( "rare holo v" ) || fRarity.includes( "rare ultra" ) ) {
        etch = "etched";
        style = "sunpillar";
      }
      if ( fRarity.includes( "rare secret" ) ) {
        etch = "etched";
        style = "swsecret";
      }
    }

    if ( isAlternate ) {
      etch = "etched";
      if ( subtypes.includes( "VMAX" ) ) {
        style = "swsecret";
        rarity = "Rare Rainbow Alt";
      } else {
        style = "sunpillar";
      }
    }

    if ( isPromo ) {
      let promoStyle = promos.get(id);
      if ( promoStyle ) {
        style = promoStyle.style.toLowerCase();
        etch = promoStyle.etch.toLowerCase();
        if ( style === "swholo" ) {
          rarity = "Rare Holo";
        } else if ( style === "cosmos" ) {
          rarity = "Rare Holo Cosmos";
        }
      }

    }
    return `https://poke-holo.b-cdn.net/foils/${ fSet }/${ type }/upscaled/${ fNumber }_foil_${ etch }_${ style }_2x.${ ext }`;
  }

  function foilImage () {
    return foilMaskImage( foil, "foils" );
  }

  function maskImage () {
    return foilMaskImage( mask, "masks" );
  }

  img = cardImage();
  foil = foilImage();
  mask = maskImage();
  const back = "https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg";
  const back_img = back;
  const img_base = img?.startsWith("http") ? "" : "https://images.pokemontcg.io/";
  const front_img = img_base + img;

  let active = false;
  let interacting = false;
  const [loading, setLoading] = useState(true);

  rarity = rarity.toLowerCase();
  supertype = supertype.toLowerCase();
  number = number.toLowerCase();
  const type = types.join(" ").toLowerCase();
  const subtype = subtypes.join(" ").toLowerCase();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [onFocus, setOnFocus] = useState(false);
  const [scope, animate] = useAnimate()

  return (
    <div
      ref={scope}
      onClick={(e) => {
        const focusState = !onFocus
        setOnFocus(focusState);
        const centerX = -e.currentTarget.offsetLeft + window.scrollX + window.innerWidth / 2 - 165; 
        const centerY = -e.currentTarget.offsetTop + window.scrollY + window.innerHeight / 2 - 229; 
        if (focusState) {
          animate(scope.current, { scale: 1.5, x: centerX, y: centerY }, { duration: 0.6 })
        } else {
          animate(scope.current, { scale: 1, x: 0, y: 0 }, { duration: 0.6 })
        }
      }}
    >
    <div
      onMouseMove={(e) => {
        setX(e.nativeEvent.offsetX)
        setY(e.nativeEvent.offsetY)

        const pointerFromCenter = (min = 0, max = 100) => {
          const value = Math.sqrt(((y - (459/2)) / (459/2)) ** 2 + ((x - (330/2)) / (330/2)) ** 2)
          return Math.min(Math.max(value, min), max);
        }

        const shine = document.getElementById('shine') as HTMLElement

        switch (rarity) {
          case 'rare secret' :
            shine.style.content = ``;
            shine.style.maskImage = ``;
            shine.style.backgroundImage = `
              url(${foil}), 
              linear-gradient( 45deg, hsl(46, 95%, 50%), hsl(52, 100%, 69%) ), 
              radial-gradient( 
                farthest-corner circle at ${x}px ${y}px, 
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

        
        const rotateX = 40/330 * y - 20;
        const rotateY = -60/459 * x + 30;

        const overlay = document.getElementById('overlay') as HTMLElement
        overlay.style.transform = 'translateZ(1.41px)'
        overlay.style.overflow = 'hidden'
        overlay.style.backgroundImage = `radial-gradient(
          farthest-corner circle at ${x}px ${y}px,
          hsla(0, 0%, 100%, 0.8) 10%,
          hsla(0, 0%, 100%, 0.65) 20%,
          hsla(0, 0%, 0%, 0.5) 90%
        )`
        // overlay.style.opacity = '0.8'
        overlay.style.mixBlendMode = 'hard-light';

        overlay.style.filter = 'brightness(.9) contrast(2)';
        overlay.style.opacity = `${(pointerFromCenter(0, 1) + 0.2) * 0.5}`;
              
        const container = document.getElementById('rootContainer') as HTMLElement
        container.style.transition = '0.1s'
        container.style.transform = `perspective(750px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      onMouseOut={(e) => {

        const shine = document.getElementById('shine') as HTMLElement

        const pointerFromCenter = (min = 0, max = 100) => {
          const value = Math.sqrt(((y - (459/2)) / (459/2)) ** 2 + ((x - (330/2)) / (330/2)) ** 2)
          return Math.min(Math.max(value, min), max);
        }
        
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
            shine.style.filter = `brightness(calc( 0.4 + (${pointerFromCenter} * 0.2) )) contrast(1) saturate(2.7)`;
            break;
          default:
            shine.style.maskImage = `url(${mask})`
            shine.style.maskSize = 'cover'
            shine.style.maskPosition = 'center center'
        }

        const overlay = document.getElementById('overlay') as HTMLElement
        overlay.style.opacity = `0`
        const container = document.getElementById('rootContainer') as HTMLElement
        container.style.transition = '0.6s'
        container.style.transform = `perspective(750px) rotateX(0deg) rotateY(0deg)`
      }}
      id={"rootContainer"}
      className={
        `${swshPikachuStyles.card} ${baseStyles.cardComponent} ${baseStyles.card} ${baseStyles[type]} ${baseStyles.interactive} ${active ? baseStyles.active : ""} ${interacting ? baseStyles.interacting : ""} ${loading ? baseStyles.loading : ""} ${!!mask ? baseStyles.masked : ""}`
      }
      data-number={number}
      data-set={set}
      data-subtypes={subtype}
      data-supertype={supertype}
      data-rarity={rarity}
    >
      <div 
        className={baseStyles.card__translater}>
        <button className={baseStyles.card__rotator}>
            <Image
              src={back_img}
              alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
              loading="lazy"
              width="660"
              height="921"
            />
            <div>
            <Image
              src={front_img}
              alt="Front design of the {name} Pokemon Card, with the stats and info around the edge"
              loading="lazy"
              width="660"
              height="921"
              onLoad={() => { setLoading(false); }}
            />
            <div id="shine"></div>
            <div id="overlay"></div>
          </div>
        </button>
      </div>
    </div>
    </div>
  )
}