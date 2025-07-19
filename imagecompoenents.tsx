"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "../libs/utils"

export interface CustomImageProps {
  // Image source
  src: string
  alt: string
  fallbackSrc?: string

  // Dimensions
  width?: number | string
  height?: number | string
  aspectRatio?: string

  // Background properties
  backgroundSize?: "cover" | "contain" | "fill" | "scale-down" | "none"
  backgroundPosition?: string
  backgroundRepeat?: "repeat" | "no-repeat" | "repeat-x" | "repeat-y"

  // Border radius
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  customBorderRadius?: string

  // Shadow
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl"
  customShadow?: string

  // Border
  border?: boolean
  borderWidth?: string
  borderColor?: string
  borderStyle?: "solid" | "dashed" | "dotted"

  // Overlay
  overlay?: boolean
  overlayColor?: string
  overlayOpacity?: number
  overlayBlendMode?: string

  // Hover effects
  hoverScale?: number
  hoverRotate?: number
  hoverOpacity?: number
  hoverShadow?: string

  // Loading and error states
  showLoader?: boolean
  loaderColor?: string
  showErrorIcon?: boolean
  errorMessage?: string

  // Filters
  brightness?: number
  contrast?: number
  saturate?: number
  blur?: number
  grayscale?: number
  sepia?: number
  hueRotate?: number

  // Animation
  transition?: string

  // Container props
  className?: string
  containerClassName?: string
  style?: React.CSSProperties

  // Events
  onClick?: () => void
  onLoad?: () => void
  onError?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  fallbackSrc,
  width = "100%",
  height = "auto",
  aspectRatio,
  backgroundSize = "cover",
  backgroundPosition = "center",
  backgroundRepeat = "no-repeat",
  borderRadius = "md",
  customBorderRadius,
  shadow = "none",
  customShadow,
  border = false,
  borderWidth = "1px",
  borderColor = "#e5e7eb",
  borderStyle = "solid",
  overlay = false,
  overlayColor = "#000000",
  overlayOpacity = 0.3,
  overlayBlendMode = "normal",
  hoverScale,
  hoverRotate,
  hoverOpacity,
  hoverShadow,
  showLoader = true,
  loaderColor = "#3b82f6",
  showErrorIcon = true,
  errorMessage = "Failed to load image",
  brightness = 1,
  contrast = 1,
  saturate = 1,
  blur = 0,
  grayscale = 0,
  sepia = 0,
  hueRotate = 0,
  transition = "all 0.3s ease",
  className,
  containerClassName,
  style,
  onClick,
  onLoad,
  onError,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isHovered, setIsHovered] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentSrc(src)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  const handleImageLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleImageError = () => {
    setIsLoading(false)
    setHasError(true)
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
      setIsLoading(true)
    }
    onError?.()
  }

  const getBorderRadiusClass = () => {
    if (customBorderRadius) return ""

    const radiusMap = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      full: "rounded-full",
    }
    return radiusMap[borderRadius]
  }

  const getShadowClass = () => {
    if (customShadow) return ""

    const shadowMap = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    }
    return shadowMap[shadow]
  }

  const getFilterStyle = () => {
    const filters = []
    if (brightness !== 1) filters.push(`brightness(${brightness})`)
    if (contrast !== 1) filters.push(`contrast(${contrast})`)
    if (saturate !== 1) filters.push(`saturate(${saturate})`)
    if (blur > 0) filters.push(`blur(${blur}px)`)
    if (grayscale > 0) filters.push(`grayscale(${grayscale})`)
    if (sepia > 0) filters.push(`sepia(${sepia})`)
    if (hueRotate !== 0) filters.push(`hue-rotate(${hueRotate}deg)`)

    return filters.length > 0 ? filters.join(" ") : "none"
  }

  const getHoverTransform = () => {
    const transforms = []
    if (hoverScale && isHovered) transforms.push(`scale(${hoverScale})`)
    if (hoverRotate && isHovered) transforms.push(`rotate(${hoverRotate}deg)`)

    return transforms.length > 0 ? transforms.join(" ") : "none"
  }

  const containerStyle: React.CSSProperties = {
    width,
    height,
    aspectRatio,
    position: "relative",
    overflow: "hidden",
    cursor: onClick ? "pointer" : "default",
    transition,
    borderRadius: customBorderRadius || undefined,
    boxShadow: customShadow || undefined,
    border: border ? `${borderWidth} ${borderStyle} ${borderColor}` : "none",
    transform: getHoverTransform(),
    opacity: isHovered && hoverOpacity ? hoverOpacity : 1,
    ...style,
  }

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    backgroundImage: !isLoading && !hasError ? `url(${currentSrc})` : "none",
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    filter: getFilterStyle(),
    transition,
  }

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    opacity: overlayOpacity,
    mixBlendMode: overlayBlendMode as any,
    pointerEvents: "none",
  }

  const hoverShadowStyle = isHovered && hoverShadow ? { boxShadow: hoverShadow } : {}

  return (
    <div
      ref={imgRef}
      className={cn("relative", getBorderRadiusClass(), getShadowClass(), containerClassName)}
      style={{ ...containerStyle, ...hoverShadowStyle }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true)
        onMouseEnter?.()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onMouseLeave?.()
      }}
    >
      {/* Hidden img element for loading */}
      <img
        src={currentSrc || "/placeholder.svg"}
        alt={alt}
        style={{ display: "none" }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {/* Main image container */}
      <div className={cn("w-full h-full", className)} style={imageStyle} />

      {/* Overlay */}
      {overlay && !isLoading && !hasError && <div style={overlayStyle} />}

      {/* Loading state */}
      {isLoading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: `${loaderColor} transparent transparent transparent` }}
            />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && showErrorIcon && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <span className="text-sm text-center px-2">{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomImage
