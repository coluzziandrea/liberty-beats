import { Hamburger } from './hamburger/hamburger'
import { Title } from './title/title'
import { TopRight } from './top-right/top-right'

export const Menu = () => {
  return (
    <div className="flex flex-row w-full h-12 max-h-12 px-2 gap-4">
      <Hamburger />

      <div className="flex grow justify-center items-center">
        <Title />
      </div>

      <TopRight />
    </div>
  )
}
