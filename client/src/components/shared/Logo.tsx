interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { img: 'h-8 w-8', text: 'text-xl' },
  md: { img: 'h-12 w-12', text: 'text-3xl' },
  lg: { img: 'h-20 w-20', text: 'text-5xl' },
};

export default function Logo({ size = 'md' }: Props) {
  const s = sizes[size];
  return (
    <div className="flex flex-col items-center gap-2">
      <img src="/excavator.png" alt="CivilDISC-Cards" className={`${s.img} object-contain`} />
      <h1 className={`${s.text} font-black tracking-tight text-white`}>
        Civil<span className="text-[#ffd700]">DISC</span>-Cards
      </h1>
    </div>
  );
}
