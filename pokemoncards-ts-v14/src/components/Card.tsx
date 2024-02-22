'use client';

import altArts from "./alternate-arts.json";
import promosJson from "./promos.json";
import baseStyles from '../../public/css/cards/base.module.css';
import Image from "next/image";

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

    if ( fRarity === "rare holo" ) {
      style = "swholo";
    }

    if ( fRarity === "rare holo cosmos" ) {
      style = "cosmos";
    }

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

  const randomSeed = {
    x: Math.random(),
    y: Math.random()
  }

  const cosmosPosition = { 
    x: Math.floor( randomSeed.x * 734 ), 
    y: Math.floor( randomSeed.y * 1280 ) 
  };

  const img_base = img?.startsWith("http") ? "" : "https://images.pokemontcg.io/";
  const front_img = img_base + img;

  let isTrainerGallery = false;

  let thisCard;
  let repositionTimer;

  let active = false;
  let interacting = false;
  let firstPop = true;
  let loading = true;
  // let isVisible = document.visibilityState === "visible";

  // const springInteractSettings = { stiffness: 0.066, damping: 0.25 };
  // const springPopoverSettings = { stiffness: 0.033, damping: 0.45 };
  // let springRotate = spring({ x: 0, y: 0 }, springInteractSettings);
  // let springGlare = spring({ x: 50, y: 50, o: 0 }, springInteractSettings);
  // let springBackground = spring({ x: 50, y: 50 }, springInteractSettings);
  // let springRotateDelta = spring({ x: 0, y: 0 }, springPopoverSettings);
  // let springTranslate = spring({ x: 0, y: 0 }, springPopoverSettings);
  // let springScale = spring(1, springPopoverSettings);

  let showcaseInterval: any;
  let showcaseTimerStart: any;
  let showcaseTimerEnd: any;
  let showcaseRunning = showcase;

  const endShowcase = () => {
    if (showcaseRunning) {
      clearTimeout(showcaseTimerEnd);
      clearTimeout(showcaseTimerStart);
      clearInterval(showcaseInterval);
      showcaseRunning = false;
    }
  };

  rarity = rarity.toLowerCase();
  supertype = supertype.toLowerCase();
  number = number.toLowerCase();
  isTrainerGallery = !!number.match(/^[tg]g/i) || !!( id === "swshp-SWSH076" || id === "swshp-SWSH077" );
  const type = types.join(" ").toLowerCase();
  const subtype = subtypes.join(" ").toLowerCase();

  return (
    <div 
      className={`${baseStyles.cardComponent} ${baseStyles.card} ${baseStyles[type]} ${baseStyles.interactive}`}
      // class="card {types} / interactive / "
      // class:active
      // class:interacting
      // class:loading
      // class:masked={!!mask}
      data-number={number}
      data-set={set}
      data-subtypes={subtype}
      data-supertype={supertype}
      data-rarity={rarity}
    >
      <div 
        className={baseStyles.card__translater}>
        <button
          className={baseStyles.card__rotator}
          // on:click={activate}
          // on:pointermove={interact}
          // on:mouseout={interactEnd}
          // on:blur={deactivate}
          aria-label="Expand the Pokemon Card; {name}."
          // tabindex="0"
          >
            <Image
              className={baseStyles.card__back}
              src={back_img}
              alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
              loading="lazy"
              width="660"
              height="921"
            />
            <div className={baseStyles.card__front} 
              // style={ staticStyles + foilStyles }
            >
            <Image
              src={front_img}
              alt="Front design of the {name} Pokemon Card, with the stats and info around the edge"
              // on:load={imageLoader}
              loading="lazy"
              width="660"
              height="921"
            />
            <div className={baseStyles.card__shine}></div>
            <div className={baseStyles.card__glare}></div>
          </div>
        </button>
      </div>
    </div>
  )
}