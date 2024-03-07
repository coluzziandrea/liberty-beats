import { TiArrowBack, TiArrowForward } from 'react-icons/ti'

export const UndoRedo = () => {
  return (
    <div className="flex flex-row gap-1">
      <button>
        <TiArrowBack />
      </button>
      <button>
        <TiArrowForward />
      </button>
    </div>
  )
}
