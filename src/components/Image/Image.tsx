import React from 'react'
// @ts-ignore
import ImageStyles from './Image.module.css'

interface Props {
    source?: string
    style?: React.CSSProperties
    className?: string
    type?: 'rounded' | 'circle'
    alt?: string
    responsive?: boolean
}

export default function Image({
    source,
    style,
    className,
    type,
    alt,
    responsive
}: Props){
    let classes = [ImageStyles['paf-image-normal']]
    classes.push(type === 'rounded' && ImageStyles['paf-image-rounded'])
    classes.push(type === 'circle' && ImageStyles['paf-image-circle']) 
    if(responsive) classes.push(ImageStyles['paf-image-responsive'])
    if (className) classes.push(className)
    return (
        <>
            <img className={classes.join(' ')} src={source} style={style} alt={alt} />
        </>
    )
}
