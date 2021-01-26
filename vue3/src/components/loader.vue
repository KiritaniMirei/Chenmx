<template>
  <div id="loader-mask">
    <div id="loader"></div>
  </div>
</template>

<style lang='stylus' scoped>
#loader-mask
  absolute top right bottom left
  background rgba(255, 255, 255, 0.8)
  z-index 999
  font-size 40px
  #loader
    absolute top 30% left 50%
    color $primaryColor
    width 2em
    height 2em
    transform rotateZ(45deg) translateX(-50%)
    perspective 5em
    &:before, &:after
      content ''
      display block
      width inherit
      height inherit
      absolute left top
      border-radius 50%
      animation 1s loading linear infinite
    &:before
      transform rotateX(70deg)
    &:after
      transform rotateY(-70deg)
      animation-delay 0.4s
@keyframes loading
  0%, 100%
    box-shadow 0.2em 0 0 0 currentColor
  12%
    box-shadow 0.2em 0.2em 0 0 currentColor
  25%
    box-shadow 0 0.2em 0 0 currentColor
  38%
    box-shadow -0.2em 0.2em 0 0 currentColor
  50%
    box-shadow -0.2em 0 0 0 currentColor
  62%
    box-shadow -0.2em -0.2em 0 0 currentColor
  75%
    box-shadow 0 -0.2em 0 0 currentColor
  87%
    box-shadow 0.2em -0.2em 0 0 currentColor
</style>