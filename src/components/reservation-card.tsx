interface Props {
  place: string
  rightText: string
  imageUrl: string
}

export function ReservationCard(props: Props) {
  return (
    <button className="border-primary border-1 rounded-md shadow-sm w-80 hover:shadow-md transition-all">
      <img 
        className="w-full object-cover rounded-t-md aspect-video"
        src={props.imageUrl}
        alt={`Imagem do estacionamento ${props.place}`}
        draggable={false}
      />

      <div className="flex justify-between p-2 bg-accent rounded-b-md w-80">
        <span>{props.place}</span>
        <span>{props.rightText}</span>
      </div>
    </button>
  )
}