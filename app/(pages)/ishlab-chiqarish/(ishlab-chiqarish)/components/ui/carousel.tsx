'use client'

import * as React from 'react'
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselAutoplayOptions = {
  enabled?: boolean
  delay?: number
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
  respectReducedMotion?: boolean
}

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  autoplay?: boolean | CarouselAutoplayOptions
  autoplayDelay?: number
  autoplaySpeedOptions?: number[]
  showAutoplayControls?: boolean
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollSnapCount: number
  autoplayEnabled: boolean
  autoplayDelay: number
  autoplaySpeedOptions: number[]
  isAutoplayPaused: boolean
  isAutoplayPlaying: boolean
  setAutoplayEnabled: React.Dispatch<React.SetStateAction<boolean>>
  setAutoplayDelay: React.Dispatch<React.SetStateAction<number>>
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)
const DEFAULT_AUTOPLAY_DELAY = 3000
const DEFAULT_AUTOPLAY_SPEED_OPTIONS = [2000, 3000, 5000]

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function getAutoplayOptions(
  autoplay: CarouselProps['autoplay'],
  autoplayDelay?: number,
): Required<CarouselAutoplayOptions> {
  const options =
    typeof autoplay === 'object' && autoplay !== null ? autoplay : {}

  return {
    enabled: typeof autoplay === 'boolean' ? autoplay : options.enabled ?? true,
    delay: normalizeAutoplayDelay(
      options.delay ?? autoplayDelay ?? DEFAULT_AUTOPLAY_DELAY,
    ),
    pauseOnHover: options.pauseOnHover ?? true,
    pauseOnFocus: options.pauseOnFocus ?? true,
    respectReducedMotion: options.respectReducedMotion ?? true,
  }
}

function normalizeAutoplayDelay(delay: number) {
  return Number.isFinite(delay) && delay > 0 ? delay : DEFAULT_AUTOPLAY_DELAY
}

function usePrefersReducedMotion() {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    if (typeof window === 'undefined') return () => undefined

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', onStoreChange)

    return () => {
      mediaQuery.removeEventListener('change', onStoreChange)
    }
  }, [])

  const getSnapshot = React.useCallback(() => {
    if (typeof window === 'undefined') return false

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false)
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  autoplay,
  autoplayDelay,
  autoplaySpeedOptions = DEFAULT_AUTOPLAY_SPEED_OPTIONS,
  showAutoplayControls = true,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const autoplayOptions = getAutoplayOptions(autoplay, autoplayDelay)
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnapCount, setScrollSnapCount] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)
  const [hasFocusWithin, setHasFocusWithin] = React.useState(false)
  const [isAutoplayEnabled, setAutoplayEnabled] = React.useState(
    autoplayOptions.enabled,
  )
  const [autoplayDelayMs, setAutoplayDelay] = React.useState(
    autoplayOptions.delay,
  )
  const prefersReducedMotion = usePrefersReducedMotion()

  const autoplaySpeedOptionsWithCurrent = React.useMemo(
    () =>
      Array.from(
        new Set([
          ...autoplaySpeedOptions.map(normalizeAutoplayDelay),
          autoplayDelayMs,
        ]),
      ).sort((a, b) => a - b),
    [autoplayDelayMs, autoplaySpeedOptions],
  )

  const isAutoplayPaused =
    (autoplayOptions.pauseOnHover && isHovered) ||
    (autoplayOptions.pauseOnFocus && hasFocusWithin) ||
    (autoplayOptions.respectReducedMotion && prefersReducedMotion)
  const isAutoplayPlaying = isAutoplayEnabled && !isAutoplayPaused

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setSelectedIndex(api.selectedScrollSnap())
    setScrollSnapCount(api.scrollSnapList().length)
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  const scrollNextForAutoplay = React.useCallback(() => {
    if (!api) return

    if (api.canScrollNext()) {
      api.scrollNext()
    } else {
      api.scrollTo(0)
    }
  }, [api])

  const handleMouseEnter = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event)
      setIsHovered(true)
    },
    [onMouseEnter],
  )

  const handleMouseLeave = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event)
      setIsHovered(false)
    },
    [onMouseLeave],
  )

  const handleFocusCapture = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onFocusCapture?.(event)
      setHasFocusWithin(true)
    },
    [onFocusCapture],
  )

  const handleBlurCapture = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onBlurCapture?.(event)

      if (!event.currentTarget.contains(event.relatedTarget)) {
        setHasFocusWithin(false)
      }
    },
    [onBlurCapture],
  )

  React.useEffect(() => {
    if (!api || !isAutoplayPlaying || scrollSnapCount <= 1) return

    const timer = window.setInterval(scrollNextForAutoplay, autoplayDelayMs)

    return () => {
      window.clearInterval(timer)
    }
  }, [
    api,
    autoplayDelayMs,
    isAutoplayPlaying,
    scrollNextForAutoplay,
    scrollSnapCount,
  ])

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return

    let isMounted = true

    queueMicrotask(() => {
      if (isMounted) onSelect(api)
    })

    api.on('reInit', onSelect)
    api.on('select', onSelect)

    return () => {
      isMounted = false
      api?.off('select', onSelect)
      api?.off('reInit', onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnapCount,
        autoplayEnabled: isAutoplayEnabled,
        autoplayDelay: autoplayDelayMs,
        autoplaySpeedOptions: autoplaySpeedOptionsWithCurrent,
        isAutoplayPaused,
        isAutoplayPlaying,
        setAutoplayEnabled,
        setAutoplayDelay,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
        {showAutoplayControls ? (
          <CarouselAutoplayControls className="absolute top-3 right-3 z-10" />
        ) : null}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {selectedIndex + 1} of {scrollSnapCount || 1}
          {isAutoplayPaused && isAutoplayEnabled ? ', autoplay paused' : ''}
        </span>
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation, isAutoplayPlaying } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      aria-live={isAutoplayPlaying ? 'off' : 'polite'}
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
}

function CarouselAutoplayControls({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const {
    autoplayEnabled,
    autoplayDelay,
    autoplaySpeedOptions,
    setAutoplayEnabled,
    setAutoplayDelay,
  } = useCarousel()
  const selectId = React.useId()

  return (
    <div
      data-slot="carousel-autoplay-controls"
      className={cn(
        'bg-background/85 text-foreground flex items-center gap-2 rounded-md border p-1 shadow-xs backdrop-blur supports-[backdrop-filter]:bg-background/70',
        className,
      )}
      {...props}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-pressed={autoplayEnabled}
        aria-label={autoplayEnabled ? 'Pause autoplay' : 'Start autoplay'}
        onClick={() => setAutoplayEnabled((enabled) => !enabled)}
      >
        {autoplayEnabled ? <Pause /> : <Play />}
        <span className="sr-only">
          {autoplayEnabled ? 'Pause autoplay' : 'Start autoplay'}
        </span>
      </Button>

      <label className="sr-only" htmlFor={selectId}>
        Autoplay speed
      </label>
      <select
        id={selectId}
        aria-label="Autoplay speed"
        value={autoplayDelay}
        disabled={!autoplayEnabled}
        onChange={(event) =>
          setAutoplayDelay(normalizeAutoplayDelay(Number(event.target.value)))
        }
        className={cn(
          'border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-8 rounded-md border px-2 text-xs shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        {autoplaySpeedOptions.map((speed) => (
          <option key={speed} value={speed}>
            {speed / 1000}s
          </option>
        ))}
      </select>
    </div>
  )
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselAutoplayControls,
  CarouselPrevious,
  CarouselNext,
}
