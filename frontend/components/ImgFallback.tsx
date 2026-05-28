'use client'

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export default function ImgFallback({ src, alt, ...props }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      {...props}
    />
  )
}
