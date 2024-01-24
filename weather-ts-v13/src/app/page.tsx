import Link from "next/link"
import style from "./style.module.css"

import { getCurrentWeather } from "@/utils/getCurrentWeather"
import { getTime } from "@/utils/getTime"
import RevalidateButton from "@/components/RevalidateButton"

export default async function Home() {

  const seoulResponse = await getCurrentWeather('seoul')
  const hochiminhcityResponse = await getCurrentWeather('sgn')
  const time = await getTime(seoulResponse.location.tz_id)

  return (
    <>
      <h1>날씨 앱</h1>
      <h3>{time.dateTime}</h3>
      <ul className={style.list}>
        <li>
          <h3><Link href="/seoul?name=서울">서울</Link></h3>
          <img src={seoulResponse.current.condition.icon} />
          <h4>{seoulResponse.current.condition.text}</h4>
        </li>
        <li>
          <h3><Link href="/sgn?name=호치민시">호치민시</Link></h3>
          <img src={hochiminhcityResponse.current.condition.icon} />
          <h4>{hochiminhcityResponse.current.condition.text}</h4>
        </li>
      </ul>
      <RevalidateButton tag={'time'} />
    </>
  )
}
