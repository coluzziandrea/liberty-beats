export const LeftMenuTranspose = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row">
        <p className="text-xs font-bold">Transpose</p>
      </div>

      <div>
        <button> +1 </button>
        <button> -1 </button>

        <button> +12 </button>
        <button> -12 </button>
      </div>
    </div>
  )
}
