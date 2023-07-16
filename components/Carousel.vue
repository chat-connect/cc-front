<template>
    <div class="content">
        <Swiper
            :slides-per-view="1"
            :loop="true"
            :autoplay="{ delay: 3000 }"
            :modules="[SwiperAutoplay]"
        >
        <SwiperSlide><p>1</p></SwiperSlide>
        <SwiperSlide><p>2</p></SwiperSlide>
        <SwiperSlide><p>3</p></SwiperSlide>
      </Swiper>
    </div>
</template>

<style>
.content {
    background-color: #ddd;
    text-align: center;
}
</style>
  