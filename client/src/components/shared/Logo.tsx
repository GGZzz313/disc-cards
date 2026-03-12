interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { img: 'w-36',  text: 'text-xl',  pull: '-mt-4' },
  md: { img: 'w-56',  text: 'text-3xl', pull: '-mt-7' },
  lg: { img: 'w-[22rem]', text: 'text-5xl', pull: '-mt-12' },
};

export default function Logo({ size = 'md' }: Props) {
  const s = sizes[size];
  return (
    <div className="flex flex-col items-center">
      <img
        src="/excavator.png"
        alt="CivilDISC-Cards excavator"
        className={`${s.img} object-contain`}
      />
      <h1 className={`${s.pull} ${s.text} font-black tracking-tight text-white relative z-10`}>
        Civil<span className="text-[#ffd700]">DISC</span>-Cards
      </h1>
    </div>
  );
}
