<template>
    <div class="content">
        <Swiper
            :slidesPerView="1"
            :loop="true"
            :autoplay="{ delay: 4000 }"
            :modules="[SwiperAutoplay, SwiperEffectCreative]"
        >
            <SwiperSlide><p>1</p></SwiperSlide>
            <SwiperSlide><p>2</p></SwiperSlide>
            <SwiperSlide><p>3</p></SwiperSlide>
            <SwiperSlide><p>4</p></SwiperSlide>
        </Swiper>
    </div>
</template>

<style>
  .content {
    background-color: #ddd;
    text-align: center;
  }
</style>
  