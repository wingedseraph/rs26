export const baseLayoutStyle = 'mx-auto flex flex-col items-center justify-center gap-20 md:mx-20 md:flex-row'

export const baseHeaderStyle = `
  absolute right-0 text-header-about z-10 cursor-pointer rounded-xl p-1 text-stone-5 outline-hidden transition-colors
  hover:bg-stone-6
  focus-visible:ring-1 focus-visible:ring-black
`
export const baseCardItemStyle = `
  relative my-10 w-full appear cursor-pointer break-inside-avoid rounded-md-custom bg-white p-1 shadow-card
  transition-shadow duration-200
  hover:shadow-card-hover
  outlet:animate-none
`
export const baseCardDetailsStyle = `
  relative size-full h-fit max-h-200 appear cursor-pointer break-inside-avoid rounded-md-custom bg-white p-1 shadow-card
  transition-shadow duration-200
  hover:shadow-card-hover
`
export const baseStyleLink = `
  group relative overflow-hidden rounded-md bg-stone-6 pt-4 pr-7 pb-5 pl-8 text-cta-about outline-hidden
  transition-colors
  hover:bg-stone-1 hover:text-stone-6
  focus-visible:ring-1 focus-visible:ring-black
  lg:rounded-lg lg:px-14 lg:pt-6 lg:pb-7
`
