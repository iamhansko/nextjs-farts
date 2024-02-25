'use client';

import promosJson from "../promos.json";
import baseStyles from '../../../public/css/cards/base.module.css';
import Image from "next/image";
import swshPikachuStyles from '../../../public/css/cards/swsh-pikachu.module.css'
import { useState } from "react";
import { useAnimate } from "framer-motion";
import { cardImage, foilMaskImage } from "@/utils/cardData";
import { MouseMoveHandler, MouseOutHandler } from "@/utils/animation";
import cardStyle from './style.module.css';

const promos: any = promosJson;

type CardProps = {
  clickHandler : any
  id : string
  name: string
  set?: string
  number: string
  types: any // string[]
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
  img = cardImage( img, set, number);
  foil = foilMaskImage( foil, "foils", rarity, supertype, promos, id, subtypes, set, number);
  mask = foilMaskImage( mask, "masks", rarity, supertype, promos, id, subtypes, set, number);
  const back = "https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg";
  const back_img = back;
  const img_base = img?.startsWith("http") ? "" : "https://images.pokemontcg.io/";
  const front_img = img_base + img;

  let active = false;
  let interacting = false;
  const [loading, setLoading] = useState(true);

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
      className={cardStyle.cardBox}
      ref={scope}
      onClick={(e) => {cardClickHandler(e)}}
    >
      <div
        onMouseMove={(e) => MouseMoveHandler(e, rarity as string, mask as string, foil as string)}
        onMouseOut={(e) => MouseOutHandler(e, rarity as string, mask as string)}
        className={
          `${swshPikachuStyles.card} ${baseStyles.cardComponent} 
          ${baseStyles.card} ${baseStyles[type]} ${baseStyles.interactive} 
          ${active ? baseStyles.active : ""} 
          ${interacting ? baseStyles.interacting : ""} 
          ${loading ? baseStyles.loading : ""} 
          ${!!mask ? baseStyles.masked : ""}`
        }
        data-number={number}
        data-set={set}
        data-subtypes={subtype}
        data-supertype={supertype}
        data-rarity={rarity}
      >
        <div className={baseStyles.card__translater}>
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
                alt="The front of a Pokemon Card, with the stats and info around the edge"
                loading="lazy"
                width="660"
                height="921"
                onLoad={() => { setLoading(false); }}
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