'use client';

import Image from "next/image";
import { useAnimate } from "framer-motion";
import { cardImage, foilMaskImage } from "@/utils/cardData";
import { MouseMoveHandler, MouseOutHandler } from "@/utils/cardAnimation";
import cardStyles from './style.module.css';

type CardProps = {
  clickHandler : (target: HTMLElement, x: number, y: number) => {}
  id : string
  name: string
  set?: string
  number: string
  types: string[]
  supertype: string
  subtypes: string[]
  rarity?: string
  isReverse?: boolean
  showcase?: boolean
  img?: string
  foil?: string
  mask?: string
  isGroup?: boolean
}

export default function Card({
  clickHandler,
  id, name, set, number, types, supertype, subtypes, rarity, isReverse, showcase, img, foil, mask, isGroup = false,
} : CardProps) {
  img = cardImage( img as string, set as string, number);
  foil = foilMaskImage( foil as string, "foils", rarity as string, supertype, id, subtypes, set as string, number) as string;
  mask = foilMaskImage( mask as string, "masks", rarity as string, supertype, id, subtypes, set as string, number) as string;
  const back = "https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg";
  const back_img = back;
  const img_base = img?.startsWith("http") ? "" : "https://images.pokemontcg.io/";
  const front_img = img_base + img;

  rarity = rarity?.toLowerCase();
  supertype = supertype.toLowerCase();
  number = number.toLowerCase();
  const type = types.join(" ").toLowerCase();
  const subtype = subtypes.join(" ").toLowerCase();

  const [scope, animate] = useAnimate()
  const cardClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const groupX = isGroup ? -(e.currentTarget.parentElement?.offsetLeft as number) : 0;
    const groupY = isGroup ? -(e.currentTarget.parentElement?.offsetTop as number) : 0;
    const centerX = groupX -e.currentTarget.offsetLeft + window.scrollX + window.innerWidth / 2 - 165; 
    const centerY = groupY -e.currentTarget.offsetTop + window.scrollY + window.innerHeight / 2 - 229; 
    clickHandler(scope.current, centerX, centerY)
  }

  return (
    <div
      className={cardStyles.cardBox}
      ref={scope}
      onClick={(e) => {cardClickHandler(e)}}
    >
      <div
        onMouseMove={(e) => MouseMoveHandler(e, rarity as string, mask as string, foil as string)}
        onMouseOut={(e) => MouseOutHandler(e, rarity as string, mask as string)}
        className={`${cardStyles.card} ${cardStyles[type]}`}
        data-number={number}
        data-set={set}
        data-subtypes={subtype}
        data-supertype={supertype}
        data-rarity={rarity}
      >
        <div className={cardStyles.card__translater}>
          <button className={cardStyles.card__rotator}>
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
                alt="The front of a Pokemon Card, with the stats and info around the edge"
                loading="lazy"
                width="660"
                height="921"
              />
              <div className={"shine"}></div>
              <div className={"glare"}></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}