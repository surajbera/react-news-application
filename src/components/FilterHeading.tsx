interface FilterHeadingProps {
  text: string;
}

export default function FilterHeading({ text }: FilterHeadingProps) {
  return <h3 className='filter-heading'>{text}</h3>;
}
